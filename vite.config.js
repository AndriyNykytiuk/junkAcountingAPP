import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({

  plugins: [react(), tailwindcss()],
  base: '/junkAcountingAPP/',
   server: {
    proxy: {
      '/api': {
        target: 'http://rasp.ivkeen.keenetic.link',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
