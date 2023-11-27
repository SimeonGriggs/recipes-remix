// import { FiBookmark } from 'react-icons/fi'
import {defineField} from 'sanity'

export default {
  name: 'ingredient',
  title: 'Ingredient',
  //   icon: FiBookmark,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'plural', type: 'string'}),
    {
      name: `cupInGrams`,
      title: `1 Cup in Grams`,
      type: `number`,
      description: `1 Cup is 250mL`,
    },
    defineField({
      name: 'alternativeNames',
      type: 'array',
      of: [defineField({name: 'title', type: 'string'})],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
