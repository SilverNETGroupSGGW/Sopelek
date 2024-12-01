import { useToast } from 'vue-toastification'
import type { UserResult } from '~/types/apiResults'
import { useUserApi } from '../api/useUserApi'

export const useUserSearch = defineStore('userSearch', {
  state: () => ({
    selectedUser: null as UserResult | null,
    users: [] as UserResult[],
    usersOptions: [] as { value: string, label: string }[],
  }),
  actions: {
    async getUsersBySearchPhrase(searchPhrase: string) {
      const userApi = useUserApi()

      const response = await userApi.getUsers()

      if (response.status === 200 && response.data) {
        this.users = response.data
        this.usersOptions = this.users.map(user => ({
          value: user.userName,
          label: `${user.userName}`,
        }))
      }
      else {
        const toast = useToast()
        toast.error('Coś poszło nie tak, skontaktuj się z administratorem')
      }
    },
  },
})
