import {FolderIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'
import type {Rule} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: Rule) => Rule.required(),
    }),
  ],
})
