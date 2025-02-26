import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import {
  VitePWA
} from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: 'prompt',
  injectRegister: 'script',
  includeAssets: ['favicon.ico',
    'apple-touch-icon.png',
    'masked-icon.svg'],
  manifest: {
    name: 'QueAI',
    short_name: 'QueAI',
    description: '',
    icons: [{
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }],
    theme_color: '#101218',
    background_color: '#101218',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: "portrait"
  }
}





// https://vite.dev/config/
export default defineConfig( {
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
})