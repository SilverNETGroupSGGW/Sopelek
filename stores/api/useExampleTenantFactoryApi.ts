import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { ExampleTenantResult } from '~/types/apiResults/ExampleTenantResult'

export const useExampleTenantFactory = defineStore('exampleTenantFactory', {
  state: () => ({ }),
  actions: {
    async createExampleTenant(tenantName: string): Promise<ApiResponse<ExampleTenantResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ExampleTenantResult>(Method.POST, 'ExampleTenantFactory', { tenantName }, null, true)
    },
  },
})
