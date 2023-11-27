import type {LoaderFunction} from '@remix-run/node'

import {Link, useLoaderData} from '@remix-run/react'

import {getUser, requireUserId} from '~/utils/auth.server'

export const loader: LoaderFunction = async ({request}) => {
  // await requireUserId(request)
  const user = await getUser(request)

  return {user}
}

export default function Index() {
  const {user} = useLoaderData()

  return (
    <div className="min-h-screen bg-cyan-50 p-4">
      {user?.id ? (
        <div className="mb-4 rounded bg-white p-4 text-xs  shadow-sm">
          Logged in as {user.email}
        </div>
      ) : null}
      <Link to="/recipes">View Recipes</Link>
    </div>
  )
}
