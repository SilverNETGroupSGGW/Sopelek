import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { SubjectTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useSubjectTypeApi = defineStore('subjectTypeApi', {
  state: () => ({}),
  actions: {
    async getSubjectTypes(): Promise<ApiResponse<SubjectTypeResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectTypeResult[]>(Method.GET, 'SubjectTypes', null, null, true)
    },
    async getSubjectType(subjectTypeId: string): Promise<ApiResponse<SubjectTypeResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectTypeResult>(Method.GET, `SubjectTypes/${subjectTypeId}`, null, null, true)
    },
    async getSubjectTypeByTenantId(tenantId: string): Promise<ApiResponse<SubjectTypeResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectTypeResult[]>(Method.GET, `SubjectTypes/byTenantId/${tenantId}`, null, null, true)
    },
    async createSubjectType(subjectType: SubjectTypeResult): Promise<ApiResponse<SubjectTypeResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectTypeResult>(Method.POST, 'SubjectTypes', subjectType, null, true)
    },
    async updateSubjectType(subjectType: SubjectTypeResult): Promise<ApiResponse<SubjectTypeResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectTypeResult>(Method.PUT, 'SubjectTypes', subjectType, null, true)
    },
    async deleteSubjectType(subjectTypeId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `SubjectTypes/${subjectTypeId}`, null, null, true)
    },
  },
})
