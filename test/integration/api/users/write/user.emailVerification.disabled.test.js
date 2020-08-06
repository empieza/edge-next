import * as handlerAuth from '../../../../../pages/api/auth/[...action]'

import { apiResolver } from 'next/dist/next-server/server/api-utils'
import fetch from 'isomorphic-unfetch'
import { findUserWithPassword } from '../../../../../lib/api/entities/users/user'
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
      emailVerification: false,
      roles: [{ label : 'user', value: 'USER'}],
      newUserRoles: ['USER']
    },
  }),
}))

const newUser = {
  username: 'emilio',
  email: 'email@email.com',
  password: 'test123123',
}

describe('Integration tests for email verification with emailVerification disabled', () => {
  let serverAuth
  let urlAuth
  let urlLogin

  beforeAll(async (done) => {
    serverAuth = http.createServer((req, res) =>
      apiResolver(req, res, undefined, handlerAuth)
    )

    urlAuth = await listen(serverAuth)
    urlLogin = urlAuth + '/api/auth/login'
    done()
  })

  afterAll((done) => {
    serverAuth.close(done)
  })

  afterEach(() => {
    findUserWithPassword.mockReset()
  })

  test('Login Should return 200 for a non verified user when email verification is disabled', async () => {
    findUserWithPassword.mockReturnValueOnce(
      Promise.resolve({
        ...newUser,
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
    const jsonResult = await response.json()

    expect(jsonResult).toMatchObject({
      done: true,
    })
  })

  test('send email for verification should NOT be called after a user registered', () => {
    onUserAdded(newUser)
    expect(sendVerifyEmail).not.toHaveBeenCalled()
  })
})
