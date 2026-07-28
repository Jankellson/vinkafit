import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Raksts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Virsraksts',
      type: 'string',
      validation: (R) => R.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL adrese)',
      type: 'slug',
      description: 'Automātiski ģenerēts no virsraksta. Piemērs: 5-uztura-kludas',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Apraksts (SEO meta)',
      type: 'text',
      rows: 3,
      description: 'Redzams Google rezultātos. Ieteicami 120–160 simboli.',
      validation: (R) => R.required().min(50).max(160),
    }),
    defineField({
      name: 'pubDate',
      title: 'Publicēšanas datums',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      description: 'Piemērs: Uzturs · Sievietēm 30–50',
    }),
    defineField({
      name: 'tags',
      title: 'Tagi',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Atslēgvārdi, piemēram: uztura kļūdas, olbaltumvielas',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      title: 'Vāka attēls',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt teksts (pieejamībai + SEO)',
          type: 'string',
          description: 'Apraksti attēlu latviski',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autors',
      type: 'string',
      initialValue: 'Ieva Jēkabsone',
    }),
    defineField({
      name: 'body',
      title: 'Raksta saturs',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Pamatteksts', value: 'normal' },
            { title: 'Virsraksts H2', value: 'h2' },
            { title: 'Virsraksts H3', value: 'h3' },
            { title: 'Citāts', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Treknraksts', value: 'strong' },
              { title: 'Kursīvs', value: 'em' },
              { title: 'Kods', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Saite',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt teksts', type: 'string' },
            { name: 'caption', title: 'Paraksts', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'draft',
      title: 'Melnraksts (nerādīt mājaslapā)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'pubDate',
      media: 'image',
    },
    prepare({ title, date, media }) {
      const d = date ? new Date(date).toLocaleDateString('lv-LV') : 'Nav datuma';
      return { title, subtitle: d, media };
    },
  },
  orderings: [
    {
      title: 'Publicēšanas datums (jaunākie pirmie)',
      name: 'pubDateDesc',
      by: [{ field: 'pubDate', direction: 'desc' }],
    },
  ],
});
