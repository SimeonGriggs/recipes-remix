import type {User} from '@prisma/client'
import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import groq from 'groq'
import Banner from '~/components/Banner'
import Controls from '~/components/Controls'
import Favorite from '~/components/Favorite'
import Ingredients from '~/components/Ingredients'
import Layout from '~/components/Layout'
import {getUser} from '~/utils/auth.server'
import {client} from '~/utils/sanityClient.server'
import type {Recipe} from '.'

export const loader: LoaderFunction = async ({request, params}) => {
  const {slug} = params
  const user = await getUser(request)
  const recipe = await client.fetch(
    groq`*[_type == "recipe" && slug.current == $slug][0]{
      "data": select(
          !$authenticated && premium == true => @ {
            title,
            premium
          },
          @ {
            ...,
            category->{ title }
          }
      )
    }.data`,
    {
      slug,
      authenticated: Boolean(user?.id),
    }
  )

  return {user, recipe}
}

type LoaderData = {
  user: User
  recipe: Recipe
}

export default function Recipes() {
  const {user, recipe} = useLoaderData<LoaderData>()

  const {description, category, title, ingredientSets} = recipe
  console.log(recipe)

  return (
    <Layout user={user}>
      <Banner description={description} category={category?.title}>
        {title}
      </Banner>
      <Controls />
      <section className="mx-auto max-w-4xl p-4">
        {user?.id ? <Favorite user={user} recipe={recipe} /> : null}
        {!user?.id && recipe.premium ? (
          <p className="mb-4 text-red-500">Premium Recipe</p>
        ) : (
          <>
            <Ingredients ingredientSets={ingredientSets} />
          </>
        )}
        <Link to="/recipes">All Recipes</Link>
      </section>
    </Layout>
  )
}
