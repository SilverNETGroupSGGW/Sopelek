import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { SubjectResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { SubjectConflictQuery } from '~/types/apiResults/subjects/SubjectConflictQuery'
import type { SubjectConflictsResult } from '~/types/apiResults/subjects/SubjectConflictResult'
import type { SubjectExtendedResult } from '~/types/apiResults/subjects/SubjectExtendedResult'

export const useSubjectApi = defineStore('subjectApi', {
  state: () => ({}),
  actions: {
    async getSubjects(): Promise<ApiResponse<SubjectResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectResult[]>(Method.GET, 'Subjects', null, null, true)
    },
    async getSubjectsForSchedule(scheduleId: string): Promise<ApiResponse<SubjectResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectResult[]>(Method.GET, `Subjects/schedule/${scheduleId}`, null, null, true)
    },
    async getSubject(subjectId: string): Promise<ApiResponse<SubjectResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectResult>(Method.GET, `Subjects/${subjectId}`, null, null, true)
    },
    async getSubjectExtended(subjectId: string): Promise<ApiResponse<SubjectExtendedResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectExtendedResult>(Method.GET, `Subjects/${subjectId}/extended`, null, null, true)
    },
    async getSubjectExtendedForSchedule(scheduleId: string): Promise<ApiResponse<SubjectExtendedResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectExtendedResult[]>(Method.GET, `Subjects/schedule/${scheduleId}/extended`, null, null, true)
    },
    async createSubject(subject: SubjectResult): Promise<ApiResponse<SubjectResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectResult>(Method.POST, 'Subjects', subject, null, true)
    },
    async updateSubject(subject: SubjectResult): Promise<ApiResponse<SubjectResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectResult>(Method.PUT, 'Subjects', subject, null, true)
    },
    async deleteSubject(subjectId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Subjects/${subjectId}`, null, null, true)
    },
    async checkSubjectConflicts(query: SubjectConflictQuery): Promise<ApiResponse<SubjectConflictsResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SubjectConflictsResult>(Method.POST, 'Subjects/check-conflict', query, null, true)
    },
  },
})
