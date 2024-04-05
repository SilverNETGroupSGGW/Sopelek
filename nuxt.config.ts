export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@pinia/nuxt'],
  tailwindcss: {
    exposeConfig: true,
  },
  supabase: {
    url: 'https://lyfcxchhzuijcvkscijb.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZmN4Y2hoenVpamN2a3NjaWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNjEzNDUsImV4cCI6MjAyNzczNzM0NX0.X2lbZmFRoWByJ2JfIb06Vrmt48DHrkBGElV4sTNhK1s',
  },
})
