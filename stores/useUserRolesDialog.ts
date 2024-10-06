import type { Role } from '~/types'
import { useUserRolesApi } from './api/useUserRolesApi'

export const useUserRolesDialog = defineStore('userRolesDialog', {
  state: () => ({
    isDialogVisible: false,
    userId: '',
    roles: [] as Role[] | undefined,
  }),
  actions: {
    async showDialog(userId: string) {
      this.isDialogVisible = true
      await this.getRoles(userId)
    },
    async getRoles(userId: string) {
      const userRoleApi = useUserRolesApi()
      const response = await userRoleApi.getUserRolesAsync(userId)

      if (!response.hasError) {
        this.userId = userId
        this.roles = response.data as Role[]
      }
    },
    async assignRole(role: string) {
      const userRoleApi = useUserRolesApi()
      const response = await userRoleApi.assignRoleToUserAsync(role, this.userId)

      if (!response.hasError) {
        const assignedRole = this.roles?.find(r => r.name === role)
        if (assignedRole) {
          assignedRole.isAssigned = true
        }
      }
    },
    async unassignRole(role: string) {
      const userRoleApi = useUserRolesApi()
      const response = await userRoleApi.removeRoleFromUserAsync(role, this.userId)

      if (!response.hasError) {
        const unassignedRole = this.roles?.find(r => r.name === role)
        if (unassignedRole) {
          unassignedRole.isAssigned = false
        }
      }
    },
    async clearState() {
      this.isDialogVisible = false
      this.userId = ''
      this.roles = []
    },
  },
})
