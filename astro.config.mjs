import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // production: site: 'https://outcomeworks.co.uk', (remove base + add public/CNAME when going live)
  site: 'https://outcome-lng.github.io',
  base: '/owl',
  integrations: [react(), sitemap()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
