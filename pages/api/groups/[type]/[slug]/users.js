import {
  findOneContent,
  updateOneContent,
} from '@lib/api/entities/content/content'
import {
  hasPermissionsForGroupUser,
  isValidGroupType,
  loadUser,
} from '@lib/api/middlewares'

import { connect } from '@lib/api/db'
import methods from '@lib/api/api-helpers/methods'
import {
  onGroupUpdated,
} from '@lib/api/hooks/group.hooks'

const loadGroupItemMiddleware = async (req, res, cb) => {
  const type = req.groupType

  // Allow to accept ID in the api call
  // by default the API wors like /api/group/grouptype/the-group-slug but it can accept and ID if specified
  // /api/group/grouptype/ID?field=id
  if (req.query.field === 'id') {
    searchOptions['id'] = req.query.slug
  } else {
    searchOptions['slug'] = req.query.slug
  }

  findOneContent(type.slug, searchOptions)
    .then((data) => {
      if (!data) {
        cb(new Error('group not found'))
      } else {
        req.item = data
        cb()
      }
    })
    .catch((err) => {
      cb(new Error('Error while loading group ' + err.message))
    })
}

const getUsers = async (req, res) => {
  res.status(200).json(req.item.members)
}

const addMember = async (req, res) => {

  updateOneContent(type.slug, req.item.id, {
    members: [
      ...req.item.members,
      req.body
    ]
  })
    .then((data) => {
      // Trigger on updated hook
      onGroupUpdated(data, req.currentUser)

      // Respond
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error while saving content ' + err.message,
      })
    })
}

export default async (req, res) => {
  const {
    query: { type },
  } = req

  try {
    await runMiddleware(req, res, isValidGroupType(type))
  } catch (e) {
    return res.status(405).json({
      error: e.message,
    })
  }

  try {
    // Connect to database
    await connect()
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    })
  }

  try {
    await runMiddleware(req, res, loadGroupItemMiddleware)
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    })
  }

  try {
    await runMiddleware(req, res, loadUser)
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    })
  }

  try {
    await runMiddleware(req, res, hasPermissionsForGroupUser(type, req.item))
  } catch (e) {
    return res.status(401).json({
      error: e.message,
    })
  }

  methods(req, res, {
    get: getUsers,
    post: addMember,
  })
}
