import {Studio} from 'sanity'
import type {LinksFunction, MetaFunction} from '@remix-run/node'

import styles from '../../styles/studio.css'
import config from 'sanity.config'

export let handle = `studio`

export let links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export let meta: MetaFunction = () => {
  return {
    title: 'Sanity Studio',
    description: 'The Platform for Structured Content',
  }
}

export default function StudioPage() {
  return (
    <div id="sanity-studio">
      <Studio
        config={config}
        //   unstable_noAuthBoundary
      />
    </div>
  )
}
