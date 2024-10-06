import type { Tenant } from '~/types'
import { useExampleTenantFactoryApi } from './api/useExampleTenantFactoryApi'
import { useTenantApi } from './api/useTenantApi'

export const useTenants = defineStore('tenants', {
  state: () => ({
    search: '',
    data: [] as Tenant[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async getAll() {
      const tenantApi = useTenantApi()
      const response = await tenantApi.getTenants()

      if (!response.hasError) {
        this.data = response.data!
      }
    },
    async create(tenant: Tenant) {
      const tenantApi = useTenantApi()
      const response = await tenantApi.createTenant(tenant)

      if (!response.hasError) {
        this.data.push(response.data!)
      }
    },
    async update(tenant: Tenant) {
      const tenantApi = useTenantApi()
      const response = await tenantApi.updateTenant(tenant)

      if (!response.hasError) {
        const index = this.data.findIndex(o => o.id === response.data!.id)
        this.data[index] = response.data!
      }
    },
    async delete(tenant: Tenant) {
      const tenantApi = useTenantApi()
      const response = await tenantApi.deleteTenant(tenant.id)

      if (!response.hasError) {
        this.data = this.data.filter(o => o.id !== tenant.id)
      }
    },
    async createExampleTenant(tenantName: string) {
      const exampleTenantFactoryApi = useExampleTenantFactoryApi()
      const response = await exampleTenantFactoryApi.createExampleTenant(tenantName)

      if (!response.hasError) {
        await this.getAll()
      }
    },
    async switchTenant(tenantId: string) {
      const tenantApi = useTenantApi()
      const response = await tenantApi.switchTenant(tenantId)

      if (!response.hasError) {
        await this.getAll()
      }
    },
  },
})
