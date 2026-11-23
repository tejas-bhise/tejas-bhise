import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js lives in its own lazy chunk (hero scene); it is loaded after first paint.
    chunkSizeWarningLimit: 600,
  },
})
