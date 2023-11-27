import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'

import Layout from '~/components/Layout'
import {getUser} from '~/utils/auth.server'
import {client} from '~/utils/sanityClient.server'

import type {LoaderData} from './recipes'

export const loader: LoaderFunction = async ({request}) => {
  // await requireUserId(request)
  const user = await getUser(request)
  const recipes = await client.fetch(`*[_type == "recipe" && _id in $favorites]`, {
    favorites: user?.favorites ?? [],
  })

  return {user, recipes}
}

export default function Profile() {
  const {user, recipes} = useLoaderData<LoaderData>()

  return (
    <Layout user={user}>
      <div>{recipes.length === 1 ? `1 Favorite:` : `${recipes.length} Favorites:`}</div>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <Link to={`/recipes/${recipe.slug.current}`}>{recipe.title}</Link>
        </div>
      ))}
    </Layout>
  )
}
