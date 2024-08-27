import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { TenantResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useTenantApi = defineStore('tenantApi', {
  state: () => ({
  }),
  actions: {
    async getTenants(): Promise<ApiResponse<TenantResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const tenantsResult = await makeRequest<TenantResult[]>(Method.GET, 'tenants')
      return tenantsResult
    },
    async getTenant(tenantId: string): Promise<ApiResponse<TenantResult> | null> {
      const { makeRequest } = useApiRequest()
      const tenantResult = await makeRequest<TenantResult>(Method.GET, `tenants/${tenantId}`)
      return tenantResult
    },
    async createTenant(tenant: TenantResult): Promise<ApiResponse<TenantResult> | null> {
      const { makeRequest } = useApiRequest()
      const tenantResult = await makeRequest<TenantResult>(Method.POST, 'tenants', tenant)
      return tenantResult
    },
    async updateTenant(tenant: TenantResult): Promise<ApiResponse<TenantResult> | null> {
      const { makeRequest } = useApiRequest()
      const tenantResult = await makeRequest<TenantResult>(Method.PUT, 'tenants', tenant)
      return tenantResult
    },
    async deleteTenant(tenantId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `tenants/${tenantId}`)
    },
    async switchTenant(tenantId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.POST, `Account/change-tenant/${tenantId}`)
    },
  },
})
