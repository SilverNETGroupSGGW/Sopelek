import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { LoginResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { RefreshTokenResult } from '~/types/apiResults/tokens/RefreshTokensResult'

export const useAuthApi = defineStore('authApi', {
  state: () => ({
    loginResult: null as ApiResponse<LoginResult> | null,
  }),
  actions: {
    async getTokensAsync(email?: string, password?: string, deviceToken: string = ''): Promise<ApiResponse<LoginResult>> {
      const { makeRequest } = useApiRequest()
      const loginResult = await makeRequest<LoginResult>(Method.POST, '/Tokens/login', { email, password, deviceToken }, null, false, false)
      this.loginResult = loginResult
      return this.loginResult
    },
    async refreshTokenAsync(refreshToken: string): Promise<ApiResponse<RefreshTokenResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<RefreshTokenResult>(Method.POST, '/Tokens/refresh', { refreshToken }, null, false, false)
    },
    async revokeTokenAsync(refreshToken: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<void>(Method.DELETE, '/Tokens/revoke', { refreshToken }, null, true, false)
    },
  },
})
