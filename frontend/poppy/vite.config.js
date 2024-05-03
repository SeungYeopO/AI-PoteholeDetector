import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 3001,
    host : "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://k10c106.p.ssafy.io",
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },    
  }  
})
