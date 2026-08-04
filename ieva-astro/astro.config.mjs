// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Lapas ar noindex — sitemap tās nedrīkst saturēt, citādi Google saņem
// pretrunīgu signālu (sitemap saka "indeksē", meta tags saka "neindeksē").
const noindexPages = ['/start', '/paldies', '/paldies-abonentam'];

// https://astro.build/config
export default defineConfig({
  site: 'https://ievajekabsone.lv',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/$/, '');
        return !noindexPages.includes(path);
      },
    }),
  ],
});
