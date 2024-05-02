import type { BaseResponse, Role } from '~/types'

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
      this.userId = userId

      const runtimeConfig = useRuntimeConfig()
      const response = await useFetch<BaseResponse<Role[]>>(`UsersRoles/${userId}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.roles = response.data.value?.data
    },
    async assignRole(role: string) {
      const runtimeConfig = useRuntimeConfig()
      await useFetch(`UsersRoles/assign`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify({ role, userId: this.userId }),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const assignedRole = this.roles?.find(r => r.name === role)
      if (assignedRole)
        assignedRole.isAssigned = true
    },
    async unassignRole(role: string) {
      const runtimeConfig = useRuntimeConfig()
      await useFetch(`UsersRoles/remove`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        body: JSON.stringify({ role, userId: this.userId }),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const unassignedRole = this.roles?.find(r => r.name === role)
      if (unassignedRole)
        unassignedRole.isAssigned = false
    },
    async clearState() {
      this.isDialogVisible = false
      this.userId = ''
      this.roles = []
    },
  },
})
