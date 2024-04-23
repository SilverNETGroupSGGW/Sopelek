import type { BaseResponse, Organization } from '~/types'

export const useOrganizations = defineStore('organizations', {
  state: () => ({
    search: '',
    data: [] as Organization[],
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
      const { data } = await useFetch<BaseResponse<Organization[]>>('organizations', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
      })

      this.data = data.value!.data
      console.log('all', this.data)
    },
    async create(organization: Organization) {
      const runtimeConfig = useRuntimeConfig()

      const { data } = await useFetch<BaseResponse<Organization>>('organizations', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(organization),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.value?.data!)
      console.log('create', this.data)
    },
    async update(organization: Organization) {
        const runtimeConfig = useRuntimeConfig()
        const { data } = await useFetch<BaseResponse<Organization>>('organizations', {
            baseURL: runtimeConfig.public.baseURL,
            method: 'PUT',
            body: JSON.stringify(organization),
            headers: {
              Authorization: `Bearer ${useCookie('accessToken').value}`,
            },
        })

      const index = this.data.findIndex(o => o.id === data.value?.data.id)
      this.data[index] = data.value!.data

      console.log('update', this.data)
    },
    async delete(organization: Organization) {
        const runtimeConfig = useRuntimeConfig()
        await useFetch<Organization>(`organizations/${organization.id}`, {
            baseURL: runtimeConfig.public.baseURL,
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${useCookie('accessToken').value}`,
            },
        })

        this.data = this.data.filter(o => o.id !== organization.id)
    },
  },
})