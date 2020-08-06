import * as handlerAuth from '../../../../../pages/api/auth/[...action]'

import {
  findOneUser,
  findUserWithPassword,
  updateOneUser,
} from '../../../../../lib/api/entities/users/user'

import { apiResolver } from 'next/dist/next-server/server/api-utils'
import fetch from 'isomorphic-unfetch'
import http from 'http'
import listen from 'test-listen'
import { onUserAdded } from '../../../../../lib/api/hooks/user.hooks'
import { sendVerifyEmail } from '../../../../../lib/email'

jest.mock('../../../../../lib/email')
jest.mock('../../../../../lib/api/entities/users/user')
jest.mock('../../../../../edge.config', () => ({
  __esModule: true,
  getConfig: jest.fn().mockReturnValue({
    title: 'A test',
    description: 'A test',
    user: {
      emailVerification: true,
      roles: [{ label : 'user', value: 'USER'}],
      newUserRoles: ['USER'],
    },
  }),
}))

const newUser = {
  username: 'emilio',
  email: 'email@email.com',
  password: 'test123123',
}

describe('Integration tests for email verification with emailVerification enabled', () => {
  let serverAuth
  let urlAuth
  let urlLogin
  let urlVerify

  beforeAll(async (done) => {
    serverAuth = http.createServer((req, res) =>
      apiResolver(req, res, undefined, handlerAuth)
    )

    urlAuth = await listen(serverAuth)
    urlLogin = urlAuth + '/api/auth/login'
    urlVerify = urlAuth + '/api/auth/verify'
    done()
  })

  afterAll((done) => {
    serverAuth.close(done)
  })

  afterEach(() => {
    findOneUser.mockReset()
    findUserWithPassword.mockReset()
    updateOneUser.mockReset()
  })

  test('Should return 401 for login a user with unverified email if configuration for verification is enabled', async () => {
    findUserWithPassword.mockReturnValueOnce(
      Promise.resolve({
        ...newUser,
        tokens: [],
        emailVerified: false,
      })
    )

    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password,
      }),
    })

    expect(response.status).toBe(401)
    const jsonResult = await response.json()

    expect(jsonResult).toMatchObject({
      error: 'Email not verified',
    })
  })

  test('Should return 200 for login a user with unverified email if user has tokens from an OAUTH login', async () => {
    findUserWithPassword.mockReturnValueOnce(
      Promise.resolve({
        ...newUser,
        tokens: [{
          something: 'something'
        }],
        emailVerified: false,
      })
    )

    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password,
      }),
    })

    expect(response.status).toBe(200)
  })

  test('Should return 200 for login a user with verified email if configuration for verification is enabled', async () => {
    findUserWithPassword.mockReturnValueOnce(
      Promise.resolve({
        ...newUser,
        emailVerified: true,
      })
    )

    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password,
      }),
    })

    expect(response.status).toBe(200)
  })

  test('Calling to email verification should change the status to verified', async () => {
    findOneUser.mockReturnValue(
      Promise.resolve({
        ...newUser,
        id: 'theid',
        emailVerificationToken: '1234',
      })
    )

    const response = await fetch(
      urlVerify + '?email=test@test.com&token=1234',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    expect(response.status).toBe(200)

    expect(updateOneUser).toHaveBeenCalledWith('theid', {
      emailVerified: true,
      emailVerificationToken: null,
    })
  })

  test('send email for verification should be called after a user registered', () => {
    onUserAdded(newUser)
    expect(sendVerifyEmail).toHaveBeenCalled()
  })
})
