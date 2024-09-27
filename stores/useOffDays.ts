import type { BaseResponse, OffDay } from '~/types'

export const useOffDays = defineStore('offDays', {
  state: () => ({
    data: [] as OffDay[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
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
      const { data } = await useFetch<BaseResponse<OffDay[]>>('offDay', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value!.data
    },
    async create(offDay: OffDay) {
      const runtimeConfig = useRuntimeConfig()

      const data = await $fetch<BaseResponse<OffDay>>('offDay', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(offDay),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data!)
    },
    async update(offDay: OffDay) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<OffDay>>('offDay', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(offDay),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(o => o.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(offDay: OffDay) {
      const runtimeConfig = useRuntimeConfig()

      await $fetch<OffDay>(`offDay/${offDay.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(o => o.id !== offDay.id)
    },
  },
})
