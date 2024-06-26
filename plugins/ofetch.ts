import { ofetch } from 'ofetch'
import { } from '#build/components'

export function useOfetchStatus() {
  return useState('error', () => ({
    status: 0 as number,
    request: '' as string,
    method: '' as string,
  }))
}

export default defineNuxtPlugin((_nuxtApp) => {
  const ofetchStatus = useOfetchStatus()

  globalThis.$fetch = ofetch.create({
    onResponse({ response, request, options }) {
      if (response.ok && (request as string).startsWith(import.meta.env.API_URL) && options.method !== 'GET') {
        ofetchStatus.value = {
          status: 200,
          request: request as string,
          method: options.method as string,
        }
      }
    },
    async onResponseError({ response, request, options }) {
      if (options.method !== 'GET') {
        ofetchStatus.value = {
          status: response.status,
          request: request as string,
          method: options.method as string,
        }
      }
    },
  })
})
