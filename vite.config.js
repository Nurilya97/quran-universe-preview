import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const pagesBase = process.env.VITE_BASE_PATH || '/quran-universe-preview/'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? pagesBase : '/',
  build: {
    rollupOptions: {
      input: 'spatial.html',
    },
  },
})
