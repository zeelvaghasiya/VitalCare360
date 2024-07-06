import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': ['http://localhost:8000','https://vitalcare360client-1841u3o97.vercel.app']
    }
  },
  plugins: [react()],
})
