import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { StudySemesterResult } from '~/types/apiResults/studySemester/StudySemesterResult'

export const useStudySemesterApi = defineStore('studySemesterApi', {
  state: () => ({}),
  actions: {
    async getStudySemesters(studyProgramId: string): Promise<ApiResponse<StudySemesterResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudySemesterResult[]>(Method.GET, `StudySemesters/${studyProgramId}/all`, null, null, true)
    },
    async getStudySemester(studySemesterId: string): Promise<ApiResponse<StudySemesterResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudySemesterResult>(Method.GET, `StudySemesters/${studySemesterId}`, null, null, true)
    },
    async createStudySemester(studySemester: StudySemesterResult): Promise<ApiResponse<StudySemesterResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudySemesterResult>(Method.POST, 'StudySemesters', studySemester, null, true)
    },
    async updateStudySemester(studySemester: StudySemesterResult): Promise<ApiResponse<StudySemesterResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudySemesterResult>(Method.PUT, 'StudySemesters', studySemester, null, true)
    },
    async deleteStudySemester(studySemesterId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `StudySemesters/${studySemesterId}`, null, null, true)
    },
  },
})
