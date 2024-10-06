import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { TenantResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useTenantApi = defineStore('tenantApi', {
  state: () => ({
  }),
  actions: {
    async getTenants(): Promise<ApiResponse<TenantResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<TenantResult[]>(Method.GET, 'tenants', null, null, true)
    },
    async getTenant(tenantId: string): Promise<ApiResponse<TenantResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<TenantResult>(Method.GET, `tenants/${tenantId}`, null, null, true)
    },
    async createTenant(tenant: TenantResult): Promise<ApiResponse<TenantResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<TenantResult>(Method.POST, 'tenants', tenant, null, true)
    },
    async updateTenant(tenant: TenantResult): Promise<ApiResponse<TenantResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<TenantResult>(Method.PUT, 'tenants', tenant, null, true)
    },
    async deleteTenant(tenantId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `tenants/${tenantId}`, null, null, true)
    },
    async switchTenant(tenantId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.POST, `Account/change-tenant/${tenantId}`, null, null, true)
    },
  },
})
