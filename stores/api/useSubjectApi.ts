import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { SubjectResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useSubjectApi = defineStore('subjectApi', {
  state: () => ({
  }),
  actions: {
    async getSubjects(): Promise<ApiResponse<SubjectResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<SubjectResult[]>(Method.GET, 'Subjects')
      return result
    },
    async getSubjectsForSchedule(scheduleId: string): Promise<ApiResponse<SubjectResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<SubjectResult[]>(Method.GET, `Subjects/schedule/${scheduleId}`)
      return result
    },
    async getSubject(subjectId: string): Promise<ApiResponse<SubjectResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<SubjectResult>(Method.GET, `Subjects/${subjectId}`)
      return result
    },
    async createSubject(subject: SubjectResult): Promise<ApiResponse<SubjectResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<SubjectResult>(Method.POST, 'Subjects', subject)
      return result
    },
    async updateSubject(subject: SubjectResult): Promise<ApiResponse<SubjectResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<SubjectResult>(Method.PUT, 'Subjects', subject)
      return result
    },
    async deleteSubject(subjectId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `Subjects/${subjectId}`)
    },
  },
})
