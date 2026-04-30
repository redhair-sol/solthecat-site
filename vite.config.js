import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    global: {}
  },
  server: {
    proxy: {
      '/solcam-check': {
        target: 'https://solcam.solthecat.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/solcam-check/, '/solcam/index.m3u8'),
      },
    },
  },
});
