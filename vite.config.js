import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['import', 'legacy-js-api'],
      },
    },
  },
  server: {
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 1777,
    strictPort: true,
  },
  preview: {
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 1777,
    strictPort: true,
  },
})
