import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { RoleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useUserRolesApi = defineStore('userRolesApi', {
  state: () => ({ }),
  actions: {
    async getUserRolesAsync(userId: string): Promise<ApiResponse<RoleResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<RoleResult[]>(Method.GET, `UsersRoles/${userId}`, null, null, true)
    },
    async assignRoleToUserAsync(role: string, userId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, `UsersRoles/assign`, { role, userId }, null, true)
    },
    async assignRolesToUserAsync(roles: string[], userId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, `UsersRoles/assign-multiple`, { roles, userId }, null, true)
    },
    async removeRoleFromUserAsync(role: string, userId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `UsersRoles/remove`, { role, userId }, null, true)
    },
    async removeRolesFromUserAsync(roles: string[], userId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `UsersRoles/remove-multiple`, { roles, userId }, null, true)
    },
  },
})
