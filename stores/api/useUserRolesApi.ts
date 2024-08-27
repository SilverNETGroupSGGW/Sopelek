import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { RoleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useUserRolesApi = defineStore('userRolesApi', {
  state: () => ({
    getUserRolesResult: null as ApiResponse<RoleResult[]> | null,
    roleResult: null as RoleResult | null,
  }),
  actions: {
    async getUserRolesAsync(userId: string): Promise<RoleResult | null> {
      const { makeRequest } = useApiRequest()
      const roleResult = await makeRequest<RoleResult[]>(Method.GET, `UsersRoles/${userId}`)
      this.getUserRolesResult = roleResult
      return this.roleResult
    },
    async assignRoleToUserAsync(role: string, userId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.POST, `UsersRoles/assign`, { role, userId })
    },
    async assignRolesToUserAsync(roles: string[], userId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.POST, `UsersRoles/assign-multiple`, { roles, userId })
    },
    async removeRoleFromUserAsync(role: string, userId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `UsersRoles/remove`, { role, userId })
    },
    async removeRolesFromUserAsync(roles: string[], userId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `UsersRoles/remove-multiple`, { roles, userId })
    },
  },
})
