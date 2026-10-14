import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
        // When the backend isn't running, answer API calls with JSON (not the
        // default HTML "Bad Gateway" page) so the app shows Retry instead of
        // crashing on "<!doctype ..." JSON parse errors. Dev-only handler.
        configure: (proxy) => {
          proxy.on('error', (_err, _req, res) => {
            if ('writeHead' in res) {
              const nodeRes = res as unknown as {
                writeHead: (status: number, headers: Record<string, string>) => void;
                end: (body: string) => void;
                headersSent?: boolean;
              };
              if (!nodeRes.headersSent) {
                nodeRes.writeHead(502, { 'Content-Type': 'application/json' });
                nodeRes.end(
                  JSON.stringify({
                    code: 'NETWORK',
                    message: "We couldn't generate your guide right now. Please try again.",
                  }),
                );
              }
            }
          });
        },
      },
    },
  },

  preview: {
    host: true,
  },
})

