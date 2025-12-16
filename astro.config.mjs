import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  output: 'hybrid',
  adapter: vercel({
    maxDuration: 60
  }),
  vite: {
    ssr: {
      noExternal: ['gsap']
    }
  }
});
