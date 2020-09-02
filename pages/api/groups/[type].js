import { addContent, findContent } from '@lib/api/entities/content'
import {
  hasPermissionsForGroup,
  isValidGroupType,
  loadUser,
} from '@lib/api/middlewares'

import { connect } from '@lib/api/db'
import { fillContentWithDefaultData } from '@lib/api/entities/content/content.utils'
import { groupValidations } from '@lib/validations/group'
import methods from '@lib/api/api-helpers/methods'
import { onGroupAdded } from '@lib/api/hooks/group.hooks'
import runMiddleware from '@lib/api/api-helpers/run-middleware'

const getGroups = (filterParams, paginationParams, member) => (
  req,
  res
) => {
  const type = req.groupType

  const increasedFilters = {
    ...filterParams,
  }

  if (member) {
    // Filter by member
    increasedFilters.members = { $elemMatch : { id : member }}
  }

  const isAdmin =
    req.currentUser && req.currentUser.roles.indexOf('ADMIN') !== -1
  
  const isOwner =
    req.currentUser &&
    filterParams.author &&
    req.currentUser.id === filterParams.author

  if (type.publishing.draftMode && !isAdmin && !isOwner) {
    // Filter by draft, except for admins and owners
    increasedFilters.draft = false
  }

  findContent(type.slug, increasedFilters, paginationParams)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error while loading content ' + err.message,
      })
    })
}


const createGroup = async (req, res) => {
  const type = req.groupType
  const content = req.body

  groupValidations(type, content)
    .then(async () => {

      // Content is valid
      // Add default value to missing fields
      const newContent = fillContentWithDefaultData(
        type,
        {
          ...content,
          members: [{
            id: req.currentUser.id,
            roles: ['GROUP_ADMIN']
          }, ...(content.members ? content.members.map(member => ({
            id: member.id,
            roles: member.roles
          })) : [])],
        },
        req.currentUser
      )

      addContent(type.slug, newContent)
        .then((data) => {
          // Trigger on content added hook
          onGroupAdded(data, req.currentUser)

          // Respond
          res.status(200).json(data)
        })
        .catch((err) => {
          res.status(500).json({
            error: 'Error while saving group ' + err.message,
          })
        })
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Invalid data: ' + err.message,
      })
    })
}

export default async (req, res) => {
  const {
    query: { type, sortBy, sortOrder, from, limit, author, member },
  } = req

  const filterParams = {}

  if (author) {
    filterParams.author = author
  }

  const paginationParams = {
    sortBy,
    sortOrder,
    from,
    limit,
  }

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
    await runMiddleware(req, res, loadUser)
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    })
  }

  try {
    await runMiddleware(req, res, hasPermissionsForGroup(type))
  } catch (e) {
    return res.status(401).json({
      error: e.message,
    })
  }

  methods(req, res, {
    get: getGroups(filterParams, paginationParams, member),
    post: createGroup,
  })
}
