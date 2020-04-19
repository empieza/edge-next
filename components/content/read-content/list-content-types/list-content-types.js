import { useUser } from '../../../../lib/hooks'
import config from '../../../../lib/config'
import { hasPermission } from '../../../../lib/permissions'
import Link from 'next/link'
import LinkList from '../../../link-list/link-list'
import './list-content-types.scss'

export default function () {
  const { user } = useUser()

  const links = config.content.types
    .filter((type) => {
      return hasPermission(user, `content.${type.slug}.read`)
    })
    .map((type) => {
      return {
        link: `/content/${type.slug}`,
        title: `Read all ${type.title.en}s`
      }
    })

  return (
    <div className="list-content-types">
      <LinkList links={links} />
    </div>
  )
}
