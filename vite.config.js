import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
        open: true,
        port: 5000,
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});