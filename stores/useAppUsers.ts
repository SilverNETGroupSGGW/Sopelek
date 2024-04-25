import type { BaseResponse, CreateUser, User } from '~/types'

export const useAppUsers = defineStore('appUsers', {
  state: () => ({
    search: '',
    data: [] as User[],
    columns: [
      {
        key: 'email',
        header: 'Email',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async getAll() {
      const runtimeConfig = useRuntimeConfig()
      const { data } = await useFetch<BaseResponse<User[]>>('users', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value!.data
    },
    async create(user: CreateUser) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<CreateUser>>('users', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data!)
    },
    async update(user: User) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<User>>('users', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(o => o.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(user: User) {
      const runtimeConfig = useRuntimeConfig()
      await $fetch<User>(`users/${user.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(o => o.id !== user.id)
    },
  },
})
