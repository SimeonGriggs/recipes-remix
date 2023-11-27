import type {ActionFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {getUser} from '~/utils/auth.server'
import {prisma} from '~/utils/prisma.server'

export const action: ActionFunction = async ({request}) => {
  console.log(`togglgeee!!`)

  const form = await request.formData()
  const user = await getUser(request)
  const action = form.get('action')
  const recipeId = form.get('recipeId')

  if (typeof recipeId !== 'string' || typeof user?.id !== 'string') {
    return null
  }

  let data = {}

  switch (action) {
    // prisma has a method to add items to a scalar array
    case 'add':
      data = {favorites: {push: recipeId}}
      break
    // ...but not to remove a single item
    case 'delete':
      data = {favorites: {set: user.favorites.filter((id) => id !== recipeId)}}
      break
    default:
      return null
  }

  await prisma.user.update({
    where: {id: user.id},
    data,
  })

  return null
}
