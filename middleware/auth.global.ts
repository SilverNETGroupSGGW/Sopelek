import { jwtDecode } from 'jwt-decode'
import type { UserTokens } from '~/types'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const debugMode = window.location.hostname === 'localhost'

  const accessToken = useCookie('accessToken').value
  const refreshToken = useCookie('refreshToken').value

  if (debugMode) {
    console.log('middleware/auth', '\n', 'from', from, '\n', 'to', to, '\n', 'accessToken', accessToken, '\n', 'refreshToken', refreshToken, '\n')

    if (accessToken)
      console.log('accessToken exp', new Date(jwtDecode(accessToken).exp! * 1000))

    if (refreshToken)
      console.log('refreshToken exp', new Date(jwtDecode(refreshToken).exp! * 1000))
  }

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
          if (debugMode)
            console.log('Token is expired, trying to refresh it')

          const runtimeConfig = useRuntimeConfig()
          const { data } = await useFetch<UserTokens>('/Tokens/refresh', {
            baseURL: runtimeConfig.public.baseURL,
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
          })

          if (debugMode)
            console.log('response', data)

          const tokens: UserTokens = data.value!

          if (tokens) {
            useCookie('accessToken').value = tokens.accessToken
            useCookie('refreshToken').value = tokens.refreshToken
          }

          decoded = jwtDecode(tokens.accessToken)
          expires = new Date(decoded.exp! * 1000)

          if (debugMode)
            console.log('Tokens already refreshed')
        }
      }
      catch (err) {
        if (debugMode)
          console.error('Unknown error during token refreshing', err)

        // TODO: toastr message 'please signin again'
        useCookie('accessToken').value = null
        useCookie('refreshToken').value = null
        return navigateTo('/signin')
      }
    }
  }
  else {
    // Do nothing
  }
})
