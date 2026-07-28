import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Atsauksme',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vārds',
      type: 'string',
      description: 'Piemērs: Ginta vai Ginta K.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'age',
      title: 'Vecums',
      type: 'number',
      description: 'Piemērs: 36',
    }),
    defineField({
      name: 'quote',
      title: 'Atsauksmes teksts',
      type: 'text',
      rows: 4,
      description: 'Klienta vārdiem. Nav jāredaģē — autentiskums ir svarīgāks par perfektu gramātiku.',
      validation: (R) => R.required().min(30),
    }),
    defineField({
      name: 'result',
      title: 'Konkrētais rezultāts',
      type: 'string',
      description: 'Īss apkopojums. Piemērs: "Zaudēja 8 kg 12 nedēļās, normalizējās HbA1c"',
    }),
    defineField({
      name: 'image',
      title: 'Klienta foto (pēc izvēles)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Kārtība (1 = pirmais)',
      type: 'number',
      description: 'Kontrolē secību mājaslapā',
      initialValue: 99,
    }),
    defineField({
      name: 'featured',
      title: 'Rādīt sākumlapā',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'result',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Kārtība',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
