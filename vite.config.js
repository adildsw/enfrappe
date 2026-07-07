import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: '/enfrappe/',
    server: {
        open: true,
        port: 5000,
    },
    build: {
      outDir: 'build',
      // Semantic UI ships legacy CSS that lightningcss (Vite's default
      // minifier) refuses to parse, so use esbuild for CSS minification.
      cssMinify: 'esbuild',
    },
    plugins: [react()],
  };
});