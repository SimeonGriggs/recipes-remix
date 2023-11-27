import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import schemaTypes from './sanity/schema/'

import {SANITY_DATASET, SANITY_PROJECT_ID} from '~/utils/sanityClient.server'

export default createConfig({
  name: 'Recipes',
  basePath: '/studio',

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  plugins: [
    deskTool(),
    // {structure, defaultDocumentNode}
  ],

  schema: {
    types: schemaTypes,
  },
})
