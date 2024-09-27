import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { RoleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useRolesApi = defineStore('rolesApi', {
  state: () => ({ }),
  actions: {
    async getUserRoles(userId: string): Promise<ApiResponse<RoleResult[]>> {
      return await useApiRequest().makeRequest<RoleResult[]>(Method.GET, `roles/${userId}`, null, null, true)
    },
  },
})
