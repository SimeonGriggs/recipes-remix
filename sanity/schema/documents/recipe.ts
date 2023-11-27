import {FolderIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
import type {Rule} from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({name: 'premium', type: 'boolean', initialValue: true}),
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 2}),
    defineField({name: 'featuredImage', type: 'image'}),
    defineField({name: 'category', type: 'reference', to: [{type: 'category'}]}),
    defineField({
      name: 'ingredientSets',
      type: 'array',
      of: [
        defineField({
          name: 'set',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'ingredients', type: 'array', of: [{type: 'ingredient'}]}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'featuredImage',
    },
  },
})
