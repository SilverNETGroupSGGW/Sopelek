import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { OrganizationResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useOrganizationApi = defineStore('organizationApi', {
  state: () => ({ }),
  actions: {
    async getOrganizations(): Promise<ApiResponse<OrganizationResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OrganizationResult[]>(Method.GET, 'Organizations', null, null, true)
    },
    async getOrganization(organizationId: string): Promise<ApiResponse<OrganizationResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OrganizationResult>(Method.GET, `Organizations/${organizationId}`, null, null, true)
    },
    async createOrganization(organization: OrganizationResult): Promise<ApiResponse<OrganizationResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OrganizationResult>(Method.POST, 'Organizations', organization, null, true)
    },
    async updateOrganization(organization: OrganizationResult): Promise<ApiResponse<OrganizationResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OrganizationResult>(Method.PUT, 'Organizations', organization, null, true)
    },
    async deleteOrganization(organizationId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Organizations/${organizationId}`, null, null, true)
    },
  },
})
