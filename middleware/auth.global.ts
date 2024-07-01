import { jwtDecode } from 'jwt-decode'
import type { UserTokens } from '~/types'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie('accessToken').value
  const refreshToken = useCookie('refreshToken').value

  // If user is in portal and there is no access token, redirect to signin
  if (from.path.startsWith('/portal') && to.path.startsWith('/portal')) {
    if (!accessToken || !refreshToken) {
      // TODO: toastr message 'user was logout, please signin again'
      return navigateTo('/signin')
    }
    else {
      try {
        let decoded = jwtDecode(accessToken!)
        let expires = new Date(decoded.exp! * 1000)

        // If token is expired, try to refresh it
        if (expires < new Date()) {
          const runtimeConfig = useRuntimeConfig()
          const { data } = await useFetch<UserTokens>('/Tokens/refresh', {
            baseURL: runtimeConfig.public.baseURL,
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
          })

          const tokens: UserTokens = data.value!

          if (tokens) {
            useCookie('accessToken').value = tokens.accessToken
            useCookie('refreshToken').value = tokens.refreshToken
          }

          decoded = jwtDecode(tokens.accessToken)
          expires = new Date(decoded.exp! * 1000)
        }
      }
      catch (err) {
        useCookie('accessToken').value = null
        useCookie('refreshToken').value = null
        return navigateTo('/signin')
      }
    }
  }
})
