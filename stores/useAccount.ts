import type { Account } from '~/types'

export const useAccount = defineStore('account', {
  state: () => ({
    data: null as Account | null,
  }),
  actions: {
    async get() {
      const runtimeConfig = useRuntimeConfig()
      const { data } = await useFetch<Account>('account/me', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value
    },
    async changePassword(oldPassword: string, newPassword: string) {
      const runtimeConfig = useRuntimeConfig()

      await useFetch(`account/change-password`, {
        baseURL: runtimeConfig.public.baseURL,
        query: {
          CurrentPassword: oldPassword,
          NewPassword: newPassword,
        },
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })
    },
  },
})
