import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Deliberately no server.proxy.
 *
 * This application has no backend and no API proxy. Provider requests are
 * issued by the browser directly to the official provider API.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
