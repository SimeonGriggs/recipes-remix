import type {LoaderFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import groq from 'groq'

import {prisma} from '~/utils/prisma.server'
import {client} from '~/utils/sanityClient.server'

// TODO: This route should require auth, it currently exposes user data

export const loader: LoaderFunction = async ({params, request}) => {
  const {slug} = params
  const {searchParams} = new URL(request.url)
  let recipeId = searchParams.get(`recipeId`)

  if (!slug) {
    return null
  }

  if (!recipeId) {
    recipeId = await client.fetch(
      groq`*[_type == "recipe" 
        && slug.current == $slug 
        && !(_id in path("drafts.**"))
      ][0]._id`,
      {slug}
    )
  }

  const favorites = await prisma.user.count({
    where: {
      favorites: {
        has: recipeId,
      },
    },
  })

  return json({favorites}, 200)
}
