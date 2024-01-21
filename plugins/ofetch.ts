import { ofetch } from 'ofetch'

export const useOfetchError = () => useState<number | null>('error', () => null)

export default defineNuxtPlugin((_nuxtApp) => {
  const ofetchError = useOfetchError()

  globalThis.$fetch = ofetch.create({
    onResponse({ response, request, options }) {
      if (response.ok && (request as string).startsWith('https://kampus-sggw-api.azurewebsites.net/api') && options.method !== 'GET')
        ofetchError.value = response.status
    },
    onResponseError({ response }) {
      ofetchError.value = response.status
    },
  })
})
