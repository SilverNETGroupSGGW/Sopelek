import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { OrganizationResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useOrganizationApi = defineStore('organizationApi', {
  state: () => ({
  }),
  actions: {
    async getOrganizations(): Promise<ApiResponse<OrganizationResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<OrganizationResult[]>(Method.GET, 'Organizations')
      return result
    },
    async getOrganization(organizationId: string): Promise<ApiResponse<OrganizationResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<OrganizationResult>(Method.GET, `Organizations/${organizationId}`)
      return result
    },
    async createOrganization(organization: OrganizationResult): Promise<ApiResponse<OrganizationResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<OrganizationResult>(Method.POST, 'Organizations', organization)
      return result
    },
    async updateOrganization(organization: OrganizationResult): Promise<ApiResponse<OrganizationResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<OrganizationResult>(Method.PUT, 'Organizations', organization)
      return result
    },
    async deleteOrganization(organizationId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `Organizations/${organizationId}`)
    },
  },
})
