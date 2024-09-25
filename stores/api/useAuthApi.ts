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
    async getTokensAsync(email?: string, password?: string, deviceToken: string = ''): Promise<ApiResponse<LoginResult> | null> {
      const { makeRequest } = useApiRequest()
      const loginResult = await makeRequest<LoginResult>(Method.POST, '/Tokens/login', { email, password, deviceToken }, null, false, false)
      this.loginResult = loginResult
      return this.loginResult
    },
    async refreshTokenAsync(refreshToken: string): Promise<ApiResponse<RefreshTokenResult> | null> {
      const { makeRequest } = useApiRequest()
      const refreshTokenResult = await makeRequest<RefreshTokenResult>(Method.POST, '/Tokens/refresh', { refreshToken }, null, false, false)
      return refreshTokenResult
    },
    async revokeTokenAsync(refreshToken: string): Promise<ApiResponse<void> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<void>(Method.DELETE, '/Tokens/revoke', { refreshToken }, null, true, false)
      return result
    },
  },
})
