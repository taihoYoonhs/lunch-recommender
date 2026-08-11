import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works from any subpath —
// GitHub Pages (repo subpath) and Vercel (root) both resolve assets correctly.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
