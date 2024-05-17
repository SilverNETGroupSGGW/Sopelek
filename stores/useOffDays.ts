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
    // async create(organization: Organization) {
    //  const runtimeConfig = useRuntimeConfig()
    //
    //  const data = await $fetch<BaseResponse<Organization>>('organizations', {
    //    baseURL: runtimeConfig.public.baseURL,
    //    method: 'POST',
    //    body: JSON.stringify(organization),
    //    headers: {
    //      Authorization: `Bearer ${useCookie('accessToken').value}`,
    //    },
    //  })
    //
    //  this.data.push(data.data!)
    // },
    // async update(organization: Organization) {
    //  const runtimeConfig = useRuntimeConfig()
    //  const data = await $fetch<BaseResponse<Organization>>('organizations', {
    //    baseURL: runtimeConfig.public.baseURL,
    //    method: 'PUT',
    //    body: JSON.stringify(organization),
    //    headers: {
    //      Authorization: `Bearer ${useCookie('accessToken').value}`,
    //    },
    //  })
    //
    //  const index = this.data.findIndex(o => o.id === data.data.id)
    //  this.data[index] = data.data
    // },
    // async delete(organization: Organization) {
    //  const runtimeConfig = useRuntimeConfig()
    //  await $fetch<Organization>(`organizations/${organization.id}`, {
    //    baseURL: runtimeConfig.public.baseURL,
    //    method: 'DELETE',
    //    headers: {
    //      Authorization: `Bearer ${useCookie('accessToken').value}`,
    //    },
    //  })
    //
    //  this.data = this.data.filter(o => o.id !== organization.id)
    // },
  },
})
