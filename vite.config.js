import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Absolute base so nested routes (/projects, /contact) load assets correctly.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
