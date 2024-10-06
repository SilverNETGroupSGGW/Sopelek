import type { CreateUser, User } from '~/types'
import type { UserResult } from '~/types/apiResults'
import { useUserApi } from './api/useUserApi'

export const useAppUsers = defineStore('appUsers', {
  state: () => ({
    search: '',
    data: [] as User[],
    columns: [
      { key: 'email', header: 'Email' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async getAll() {
      const userApi = useUserApi()
      const response = await userApi.getUsers()
      this.data = response.data as User[]
    },
    async create(user: CreateUser) {
      const userApi = useUserApi()
      const response = await userApi.createUser(user.email, user.password)
      this.data.push(response.data as User)
    },
    async update(user: User) {
      const userApi = useUserApi()
      const response = await userApi.updateUser(user as UserResult)
      const index = this.data.findIndex(o => o.id === response.data!.id)
      this.data[index] = response.data as User
    },
    async delete(user: User) {
      const userApi = useUserApi()
      const response = await userApi.deleteUser(user.id)
      if (response.hasError) {
        return
      }
      this.data = this.data.filter(o => o.id !== user.id)
    },
  },
})
