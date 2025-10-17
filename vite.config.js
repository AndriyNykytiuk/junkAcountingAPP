import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react(), tailwindcss()],
  base: './',
   server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'https://rasp.ivkeen.keenetic.link',
         changeOrigin: true,
    
       
      },
    },
  }
})
