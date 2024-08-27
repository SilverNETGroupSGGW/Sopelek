import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { LoginResult } from '~/types/apiResults'

export const useAuthApi = defineStore('authApi', {
  state: () => ({
    loginResult: null as LoginResult | null,
  }),
  actions: {
    async getTokensAsync(email?: string, password?: string, deviceToken: string = ''): Promise<LoginResult | null> {
      const { makeRequest } = useApiRequest()
      const loginResult = await makeRequest<LoginResult>(Method.POST, '/Tokens/login', { email, password, deviceToken })
      this.loginResult = loginResult
      return this.loginResult
    },
  },
})
