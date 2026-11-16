import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seoFallback from './vite-plugin-seo-fallback.js';

export default defineConfig({
  base: '/',
  plugins: [react(), seoFallback()],
  server: {
    port: 5173,
  },
  build: {
    target: 'esnext',
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/framer-motion')) {
            return 'vendor';
          }
        },
      },
    },
    sourcemap: false,
  },
});
