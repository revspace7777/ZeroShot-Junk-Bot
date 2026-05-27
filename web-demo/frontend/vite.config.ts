import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../odoo_module/junk_pricing/static/src/',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `pricing-widget.js`,
        chunkFileNames: `pricing-widget.js`,
        assetFileNames: `pricing-widget.[ext]`
      }
    }
  }
})
