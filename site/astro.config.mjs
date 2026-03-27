import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dkfitcoaching-lab.github.io',
  base: '/Perpetual-Petals-Demo',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
