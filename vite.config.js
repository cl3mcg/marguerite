import path from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@assets': path.resolve(__dirname, "./public/assets"),
      '@components': path.resolve(__dirname, "./src/components"),
      '@routes': path.resolve(__dirname, "./src/routes"),
      '@stores': path.resolve(__dirname, "./src/stores"),
      '@styles': path.resolve(__dirname, "./src/styles"),
      '@composables': path.resolve(__dirname, "./src/composables"),
    },
  },
  server: {
    proxy: {
      '/backend': 'http://localhost:3000',
    },
  },
})
