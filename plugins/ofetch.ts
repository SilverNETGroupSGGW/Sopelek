import { ofetch } from 'ofetch'

export const useOfetchError = () => useState<number | null>('error', () => null)

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onResponseError({ response }) {
      const ofetchError = useOfetchError()
      ofetchError.value = response.status
    },
  })
})
