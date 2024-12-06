// import {defineField, defineType} from 'sanity'

// export default defineType({
//   name: 'blog',
//   title: 'Blog',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'title',
//       title: 'Title',
//       type: 'string',
//     }),
//     defineField({
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: {
//         source: 'title',
//         maxLength: 96,
//       },
//     }),
//     defineField({
//       name: 'mainImage',
//       title: 'Main image',
//       type: 'image',
//       options: {
//         hotspot: true,
//       },
//     }),

//   ],


// })

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogs',
  title: 'Blogs',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
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
      name: 'price',
      title: 'Price',
      type: 'text',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'transactions',
      title: 'Transactions',
      type: 'text',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'room',
      title: 'Room',
      type: 'number',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'text',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'number',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bathroom',
      title: 'Bathroom',
      type: 'number',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'garage',
      title: 'Garage',
      type: 'number',
      options: {
        hotspot: true,
      },
    }),
  ],
})
