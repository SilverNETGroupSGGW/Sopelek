import type { BaseResponse, Tenant } from '~/types'

export const useTenants = defineStore('tenants', {
  state: () => ({
    search: '',
    data: [] as Tenant[],
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
      const { data } = await useFetch<BaseResponse<Tenant[]>>('tenants', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
      })

      this.data = data.value!.data
    },
    async create(tenant: Tenant) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<Tenant>>('tenants', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(tenant),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data!)
    },
    async update(tenant: Tenant) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<Tenant>>('tenants', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(tenant),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(o => o.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(tenant: Tenant) {
      const runtimeConfig = useRuntimeConfig()
      await $fetch<Tenant>(`tenants/${tenant.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(o => o.id !== tenant.id)
    },
  },
})
