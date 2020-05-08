import LinkList from '../../../generic/link-list/link-list'
import { useContentTypes } from '../../../../lib/hooks'

export default function () {
  const contentTypes = useContentTypes(['read', 'admin'])

  const links = contentTypes
    .map((type) => {
      return {
        link: `/content/${type.slug}`,
        title: `See all ${type.title.en}s`,
      }
    })

  return (
    <>
      <div className="listContentTypes">
        <LinkList links={links} />
      </div>

      <style jsx>{`
        .listContentTypes {
          margin-bottom: var(--empz-gap-double);
        }
      `}</style>
    </>
  )
}
