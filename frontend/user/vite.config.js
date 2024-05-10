import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        icons: [
          {
            src: "/main.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/main.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/main.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/main.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    host : "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://k10c106.p.ssafy.io",
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
