import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://perpetual-petals.com',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
