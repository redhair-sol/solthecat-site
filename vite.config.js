import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mirrors functions/solcam-check.js for the dev server so the client uses one
// URL contract (`/solcam-check` returning { live: bool }) in both dev and prod.
function solcamCheckDevPlugin() {
  return {
    name: 'solcam-check-dev',
    configureServer(server) {
      server.middlewares.use('/solcam-check', async (req, res) => {
        let live = false;
        try {
          const upstream = await fetch(
            'https://solcam.solthecat.com/solcam/index.m3u8',
            { method: 'GET', signal: AbortSignal.timeout(3000) }
          );
          live = upstream.ok;
        } catch {
          live = false;
        }
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify({ live }));
      });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), solcamCheckDevPlugin()],
  define: {
    global: {}
  },
});
