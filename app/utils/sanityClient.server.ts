// import {Block} from 'sanity'
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
// import cuid from 'cuid'

export const SANITY_PROJECT_ID = `4m16m8l4`
export const SANITY_DATASET = `production`
export const SANITY_API_VERSION = `2022-08-25`

export const client = new sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV !== 'development',
})

export async function getCurrentUser() {
  const userUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/${SANITY_API_VERSION}/users/me`
  return await fetch(userUrl, {credentials: `include`})
    .then((res) => res.json())
    .catch((err) => err)
}

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// export function textToBlocks(text: string) {
//   const value = text.split('\n').map((line) => ({
//     _key: cuid(),
//     _type: 'block',
//     children: [
//       {
//         _key: cuid(),
//         _type: 'span',
//         marks: [],
//         text: line,
//       },
//     ],
//     markDefs: [],
//     style: 'normal',
//   }))

//   return value as Block[]
// }
