import { hasPermissionsForGroup, loadUser } from '@lib/api/middlewares'

import { GetServerSideProps } from 'next'
import GroupDetailView from '@components/groups/read/group-detail-view/group-detail-view'
import Layout from '@components/layout/three-panels/layout'
import ToolBar from '@components/generic/toolbar/toolbar'
import { connect } from '@lib/api/db'
import { findOneContent } from '@lib/api/entities/content/content'
import { getGroupTypeDefinition } from '@lib/config'
import runMiddleware from '@lib/api/api-helpers/run-middleware'

// Get serversideProps is important for SEO, and only available at the pages level
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const groupTypeDefinition = getGroupTypeDefinition(query.type)

  if (!groupTypeDefinition) {
    res.writeHead(302, { Location: '/404' })
    res.end()
    return
  }

  await connect()

  const searchOptions =  query.field && query.field === 'id'
    ? {
        id: query.slug,
      }
    : {
        slug: query.slug,
      }

  const item = await findOneContent(query.type, searchOptions)

  if (!item) {
    res.writeHead(302, { Location: '/404' })
    res.end()
    return
  }

  try {
    await runMiddleware(req, res, loadUser)
    await runMiddleware(req, res, hasPermissionsForGroup(query.type, item))
  } catch (e) {
    // User can not access
    res.writeHead(302, { Location: '/404' })
    res.end()
    return
  }

  const contentTitle =
    item && groupTypeDefinition.publishing.title
      ? item[groupTypeDefinition.publishing.title]
      : `${groupTypeDefinition.title} detail`



  return {
    props: {
      data: item || null,
      type: query.type,
      slug: query.slug,
      canAccess: true,
      pageTitle: contentTitle,
      groupType: groupTypeDefinition,
    },
  }
}

const ContentPage = (props) => {
  return (
    <Layout
      title={props.pageTitle}
      panelUser={<ToolBar />}
    >
      {props.canAccess && props.data && (
        <GroupDetailView
          type={props.groupType}
          group={props.data}
          showActions={true}
        />
      )}
    </Layout>
  )
}

export default ContentPage
