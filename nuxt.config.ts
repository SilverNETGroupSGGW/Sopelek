import process from 'node:process'

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: `font-['Open_Sans']`,
      },
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  tailwindcss: {
    exposeConfig: true,
  },
  googleFonts: {
    families: {
      'Open+Sans': [400, 500, 600, 700],
    },
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      edgeThreshold: 16, // resize and drag bounds
      groupHeight: 160, // height of a group cell,
      intervalWidth: 24, // width of 5 minutes interval cell
      baseURL: process.env.BASE_URL || 'https://kampus-sggw-api.azurewebsites.net/api',
    },
  },
})
