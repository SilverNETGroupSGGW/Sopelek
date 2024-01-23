import { ofetch } from 'ofetch'

export function useOfetchStatus() {
  return useState('error', () => ({
    status: 0 as number,
    request: '' as string,
  }))
}

export default defineNuxtPlugin((_nuxtApp) => {
  const ofetchStatus = useOfetchStatus()

  globalThis.$fetch = ofetch.create({
    onResponse({ response, request, options }) {
      if (response.ok && (request as string).startsWith('https://kampus-sggw-api.azurewebsites.net/api') && options.method !== 'GET') {
        ofetchStatus.value = {
          status: 200,
          request: request as string,
        }
      }
    },
    onResponseError({ response, request, options }) {
      if (options.method !== 'GET') {
        ofetchStatus.value = {
          status: response.status,
          request: request as string,
        }
      }
    },
  })
})
