import type {User} from '@prisma/client'
import {Link} from '@remix-run/react'

type LayoutProps = {
  children: React.ReactNode
  user?: User
}

export default function Layout(props: LayoutProps) {
  const {children, user} = props

  return (
    <div className="min-h-screen">
      {user?.id ? (
        <div className="m-4 rounded bg-white text-xs shadow">
          <Link className="block p-4" to={`/profile`}>
            Logged in as {user.email}
          </Link>
        </div>
      ) : null}
      {children}
    </div>
  )
}
