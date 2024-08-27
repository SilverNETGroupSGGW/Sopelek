import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { UserResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useUserApi = defineStore('userApi', {
  state: () => ({
    users: null as ApiResponse<UserResult[]> | null,
  }),
  actions: {
    async getUsers(paginationParam?: any): Promise<ApiResponse<UserResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const usersResult = await makeRequest<UserResult[]>(Method.GET, 'users', null, paginationParam)
      return usersResult
    },
    async getUser(userId: string): Promise<ApiResponse<UserResult> | null> {
      const { makeRequest } = useApiRequest()
      const usersResult = await makeRequest<UserResult>(Method.GET, `users/${userId}`)
      return usersResult
    },
    async createUser(email: string, password: string): Promise<ApiResponse<UserResult> | null> {
      const { makeRequest } = useApiRequest()
      const userResult = await makeRequest<UserResult>(Method.POST, 'users', { email, password })
      return userResult
    },
    async updateUser(user: UserResult): Promise<ApiResponse<UserResult> | null> {
      const { makeRequest } = useApiRequest()
      const userResult = await makeRequest<UserResult>(Method.PUT, 'users', user)
      return userResult
    },
    async deleteUser(userId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `users/${userId}`)
    },
    async changeTenant(userId: string, tenantId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.POST, `users/${userId}/change-tenant`, { tenantId })
    },
  },
})
