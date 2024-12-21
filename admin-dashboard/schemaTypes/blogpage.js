import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogpage',
  title: 'Blogpage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'text',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'text',
    }),

  ],
})
