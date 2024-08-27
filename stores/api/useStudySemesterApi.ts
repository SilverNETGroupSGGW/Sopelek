import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { SubjectTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useStudySemesterApi = defineStore('studySemesterApi', {
  state: () => ({
  }),
  actions: {
    async getStudySemesters(studyProgramId: string): Promise<ApiResponse<SubjectTypeResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const studySemestersResult = await makeRequest<SubjectTypeResult[]>(Method.GET, `StudySemesters/${studyProgramId}/all`)
      return studySemestersResult
    },
    async getStudySemester(studySemesterId: string): Promise<ApiResponse<SubjectTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const studySemesterResult = await makeRequest<SubjectTypeResult>(Method.GET, `StudySemesters/${studySemesterId}`)
      return studySemesterResult
    },
    async createStudySemester(studySemester: SubjectTypeResult): Promise<ApiResponse<SubjectTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const studySemesterResult = await makeRequest<SubjectTypeResult>(Method.POST, 'StudySemesters', studySemester)
      return studySemesterResult
    },
    async updateStudySemester(studySemester: SubjectTypeResult): Promise<ApiResponse<SubjectTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const studySemesterResult = await makeRequest<SubjectTypeResult>(Method.PUT, 'StudySemesters', studySemester)
      return studySemesterResult
    },
    async deleteStudySemester(studySemesterId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `StudySemesters/${studySemesterId}`)
    },
  },
})
