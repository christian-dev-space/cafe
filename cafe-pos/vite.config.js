import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
 plugins: [
  react(),
  tailwindcss(),

  VitePWA({
    registerType: "autoUpdate",
      workbox: {
    globPatterns: [
        "**/*.{js,css,html,ico,png,svg,json}",
      ],
    },

    manifest: {
      name: "Miga Cafe POS",
      short_name: "Miga POS",

      description: "Offline Point of Sale for Miga Cafe",

      theme_color: "#4A2C2A",
      background_color: "#F8F5F0",

      display: "standalone",

      start_url: "/",

      icons: [
        {
          src: "icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  }),
],
});