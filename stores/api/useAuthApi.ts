import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { LoginResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useAuthApi = defineStore('authApi', {
  state: () => ({
    loginResult: null as ApiResponse<LoginResult> | null,
  }),
  actions: {
    async getTokensAsync(email?: string, password?: string, deviceToken: string = ''): Promise<ApiResponse<LoginResult> | null> {
      const { makeRequest } = useApiRequest()
      const loginResult = await makeRequest<LoginResult>(Method.POST, '/Tokens/login', { email, password, deviceToken }, null, false, false)
      this.loginResult = loginResult
      return this.loginResult
    },
  },
})
