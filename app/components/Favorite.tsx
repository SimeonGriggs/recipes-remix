import React from 'react'
import {useFetcher, useTransition} from '@remix-run/react'
import type {User} from '@prisma/client'

import type {Recipe} from '~/routes/recipes'

type FavoriteProps = {
  user: User
  recipe: Recipe
}

export default function Favorite(props: FavoriteProps) {
  const {recipe, user} = props

  const fetcher = useFetcher()
  const transition = useTransition()

  if (!user?.id || !recipe?.slug?.current) {
    return null
  }

  return (
    <fetcher.Form method="post" action={`/recipes/${recipe.slug.current}/toggle-favorite`}>
      <input
        type="hidden"
        name="action"
        value={user.favorites.includes(recipe._id) ? 'delete' : 'add'}
      />
      <button
        className="rounded bg-yellow-500 py-1 px-2 text-xs font-bold text-white transition-opacity duration-100 disabled:opacity-50"
        type="submit"
        name="recipeId"
        value={recipe._id}
        disabled={transition.state !== 'idle'}
      >
        {user.favorites.includes(recipe._id) ? 'Remove' : 'Star'}
      </button>
    </fetcher.Form>
  )
}
