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
      cellHeight: 160, // height of a group cell
      compressedCellHeight: 100 // height of a group cell when compressed
    }
  }
})
