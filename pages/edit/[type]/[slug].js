import { useUser } from '@lib/client/hooks'
import { contentPermission } from '@lib/permissions'
import { getContentTypeDefinition } from '@lib/config'


import API from '@lib/api/api-endpoints'
import ContentForm from '@components/content/write-content/content-form/content-form'
import Layout from '@components/layout/normal/layout'
import fetch from '@lib/fetcher'
import LoadingPage from '@components/generic/loading/loading-page/loading-page'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const EditContent = () => {
  const router = useRouter()
  const {
    query: { slug, type },
  } = router

  const contentType = getContentTypeDefinition(type)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Load data
  function loadData() {
    fetch(API.content[type] + '/' + slug)
      .then((data) => {
        setContent(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (slug && type && !content && !error) {
      loadData()
    }
  }, [slug, type, content, error])

  // Check permissions to edit
  const currentUser = useUser()
  const canAccess = contentPermission(currentUser.user, type, 'update', content)

  const onSave = (newItem) => {
    setContent(newItem)
  }

  useEffect(() => {
    if (!loading && currentUser.finished) {
      if (error || !canAccess) {
        // Redirect to 404 if the user is not found
        router.push('/404')
      }
    }
  }, [loading, canAccess, error, currentUser])

  if (!currentUser.finished || loading || error || !canAccess) {
    return (
      <Layout title="Edit content">
        <LoadingPage />
      </Layout>
    )
  }

  return (
    <>
      <Layout title="Edit content">
        <div className="edit-page">
          <h1>Editing: {content ? content.title : null}</h1>
          <ContentForm type={contentType} onSave={onSave} content={content} />
        </div>
      </Layout>

      <style jsx>{`
        .edit-page {
          margin-bottom: var(--edge-gap-double);
        }
        h1 {
          margin-bottom: var(--edge-gap);
        }
      `}</style>
    </>
  )
}

export default EditContent
