import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { AccountMe } from '~/types/apiResults/account/AccountMe'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useAccountApi = defineStore('accountApi', {
  state: () => ({ }),
  actions: {
    async getAccountMe(): Promise<ApiResponse<AccountMe>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<AccountMe>(Method.GET, 'Account/me', null, null, true, false)
    },
    async sendPasswordResetEmail(email: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, 'Account/send-reset-password-email', { email }, null, false, false)
    },
    async registerAccount(email: string, password: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, 'Account/register', { email, password }, null, false, false)
    },
    async activateAccount(email: string, code: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, 'Account/confirm', { email, verificationCode: code }, null, false, false)
    },
    async resetPassword(email: string, newPassword: string, code: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, 'Account/reset-password', { email, newPassword, verificationCode: code }, null, false, false)
    },
  },
})
