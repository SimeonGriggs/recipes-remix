import type {User} from '@prisma/client'
import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import Favorite from '~/components/Favorite'
import Layout from '~/components/Layout'

import {getUser} from '~/utils/auth.server'
import {client} from '~/utils/sanityClient.server'

export const loader: LoaderFunction = async ({request}) => {
  // await requireUserId(request)
  const user = await getUser(request)
  const recipes = await client.fetch(`*[_type == "recipe"]`)

  return {user, recipes}
}

export type Ingredient = {
  title: string
  alternativeNames: string[]
}

export type Recipe = {
  _id: string
  title: string
  premium: boolean
  slug: {current: string}
  description: string
  category: {title: string}
  ingredientSets: Ingredient[]
}

export type LoaderData = {
  user: User
  recipes: Recipe[]
}

export default function Recipes() {
  const {user, recipes} = useLoaderData<LoaderData>()

  return (
    <Layout user={user}>
      {recipes?.length ? (
        <ul className="grid grid-cols-1 divide-y divide-cyan-200 bg-teal-100">
          {recipes.map((recipe) => (
            <li className="flex justify-between py-2 px-4" key={recipe._id}>
              <Link to={recipe.slug.current}>
                <span
                  className={
                    recipe.premium && !user?.id ? `text-cyan-700 opacity-50` : `text-cyan-700`
                  }
                >
                  {recipe.title}

                  {recipe.premium ? (
                    <span className="pl-3 text-xs font-bold uppercase">(Premium)</span>
                  ) : null}
                </span>
              </Link>
              {user?.id ? <Favorite user={user} recipe={recipe} /> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </Layout>
  )
}
