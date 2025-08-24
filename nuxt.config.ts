// https://nuxt.com/docs/api/configuration/nuxt-config
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate'
  ],
  nitro: {
    imports: {
      autoImport: true
    },
    preset: 'node-server'
  },
  vite: {
    plugins: [tsconfigPaths()]
  }
})
