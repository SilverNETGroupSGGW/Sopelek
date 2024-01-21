import { ofetch } from 'ofetch'

export const useOfetchError = () => useState<number | null>('error', () => null)

export default defineNuxtPlugin((_nuxtApp) => {
  const ofetchError = useOfetchError()

  globalThis.$fetch = ofetch.create({
    onResponse({ response, request }) {
      // Show conflicts error on demand
      if ((request as string).endsWith('/subjects') && response.ok)
        ofetchError.value = response.status
    },
    onResponseError({ response }) {
      ofetchError.value = response.status
    },
  })
})
