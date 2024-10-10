import { useToast } from 'vue-toastification'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = useSession()
  const toast = useToast()

  // If user is in portal and there is no access token, redirect to signin
  if (from.path.startsWith('/portal') && to.path.startsWith('/portal')) {
    if (!session.isSessionActive) {
      toast.error('Twoja sesja wygasła, zaloguj się ponownie')
      return navigateTo('/signin')
    }
    else if (session.isSessionActive && await session.isRefreshTokenExpired()) {
      toast.error('Twoja sesja wygasła, zaloguj się ponownie')
      return navigateTo('/signin')
    }
    else if (session.isSessionActive && await session.isAccessTokenExpired()) {
      const refreshResponse = await session.refreshSession()

      if (refreshResponse.status === 'error') {
        toast.error('Twoja sesja wygasła, zaloguj się ponownie (error)')
        return navigateTo('/signin')
      }
      else if (refreshResponse.status === 'no session to refresh') {
        toast.error('Twoja sesja wygasła, zaloguj się ponownie (no session to refresh)')
        return navigateTo('/signin')
      }
      else if (refreshResponse.status === 'refresh token expired') {
        toast.error('Twoja sesja wygasła, zaloguj się ponownie (refresh token expired)')
        return navigateTo('/signin')
      }
      else {
        toast.success('Sesja odświeżona')
      }
    }
    else {
      toast.success('Sesja aktywna')
    }
  }
})
