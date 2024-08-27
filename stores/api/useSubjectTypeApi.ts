import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { SubjectTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useSubjectTypeApi = defineStore('subjectTypeApi', {
  state: () => ({
  }),
  actions: {
    async getSubjectTypes(): Promise<ApiResponse<SubjectTypeResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const subjectTypesResult = await makeRequest<SubjectTypeResult[]>(Method.GET, 'SubjectTypes')
      return subjectTypesResult
    },
    async getSubjectType(subjectTypeId: string): Promise<ApiResponse<SubjectTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const subjectTypeResult = await makeRequest<SubjectTypeResult>(Method.GET, `SubjectTypes/${subjectTypeId}`)
      return subjectTypeResult
    },
    async createSubjectType(subjectType: SubjectTypeResult): Promise<ApiResponse<SubjectTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const subjectTypeResult = await makeRequest<SubjectTypeResult>(Method.POST, 'SubjectTypes', subjectType)
      return subjectTypeResult
    },
    async updateSubjectType(subjectType: SubjectTypeResult): Promise<ApiResponse<SubjectTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const subjectTypeResult = await makeRequest<SubjectTypeResult>(Method.PUT, 'SubjectTypes', subjectType)
      return subjectTypeResult
    },
    async deleteSubjectType(subjectTypeId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `SubjectTypes/${subjectTypeId}`)
    },
  },
})
