import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { RoleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useRolesApi = defineStore('rolesApi', {
  state: () => ({
  }),
  actions: {
    async getUserRoles(userId: string): Promise<ApiResponse<RoleResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<RoleResult[]>(Method.GET, `roles/${userId}`)
      return result
    },
  },
})