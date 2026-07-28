import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

// ⚠️ Aizpildi ar sava Sanity projekta datiem no https://sanity.io/manage
const PROJECT_ID = 'cdmsq1y8';
const DATASET = 'production';

export default defineConfig({
  name: 'ieva-jekabsone-cms',
  title: 'Ieva Jēkabsone — CMS',
  basePath: '/studio',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Saturs')
          .items([
            S.listItem()
              .title('📝 Blog raksti')
              .schemaType('blogPost')
              .child(
                S.documentList()
                  .title('Blog raksti')
                  .schemaType('blogPost')
                  .defaultOrdering([{ field: 'pubDate', direction: 'desc' }])
              ),
            S.listItem()
              .title('⭐ Atsauksmes')
              .schemaType('testimonial')
              .child(
                S.documentList()
                  .title('Atsauksmes')
                  .schemaType('testimonial')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),
    visionTool(), // GROQ vaicājumu testēšana
  ],

  schema: {
    types: schemaTypes,
  },
});
