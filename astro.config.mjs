import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://studio-morrow.vercel.app',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
