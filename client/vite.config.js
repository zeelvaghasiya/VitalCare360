import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://vitalcare360.onrender.com' // 'http://localhost:8000'
    }
  },
  plugins: [react()],
})
