import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { UserResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useUserApi = defineStore('userApi', {
  state: () => ({
    users: null as ApiResponse<UserResult[]> | null,
  }),
  actions: {
    async getUsers(paginationParam?: any): Promise<ApiResponse<UserResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<UserResult[]>(Method.GET, 'users', null, paginationParam, true)
    },
    async getUser(userId: string): Promise<ApiResponse<UserResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<UserResult>(Method.GET, `users/${userId}`, null, null, true)
    },
    async createUser(email: string, password: string): Promise<ApiResponse<UserResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<UserResult>(Method.POST, 'users', { email, password }, null, true)
    },
    async updateUser(user: UserResult): Promise<ApiResponse<UserResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<UserResult>(Method.PUT, 'users', user, null, true)
    },
    async deleteUser(userId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `users/${userId}`, null, null, true)
    },
    async changeTenant(userId: string, tenantId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, `users/${userId}/change-tenant/${tenantId}`, null, null, true)
    },
  },
})
