export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: `font-['Open_Sans']`,
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@tresjs/nuxt',
  ],
  tailwindcss: {
    exposeConfig: true,
  },
  googleFonts: {
    families: {
      'Open+Sans': [400, 500, 600, 700],
    },
  },
  runtimeConfig: {
    public: {
      edgeThreshold: 16, // resize and drag bounds
      intervalHeight: 160, // height of a group cell,
      intervalWidth: 24, // width of 5 minutes interval cell

      baseURL: import.meta.env.API_URL,
    },
  },
  build: {
    transpile: ['vue-toastification'],
  },
})
