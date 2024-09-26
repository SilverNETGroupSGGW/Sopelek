import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { StudyProgramResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useStudyProgramApi = defineStore('studyProgramApi', {
  state: () => ({ }),
  actions: {
    async getStudyPrograms(): Promise<ApiResponse<StudyProgramResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudyProgramResult[]>(Method.GET, 'StudyProgram/all', null, null, true)
    },
    async getStudyProgram(studyProgramId: string): Promise<ApiResponse<StudyProgramResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudyProgramResult>(Method.GET, `StudyProgram/${studyProgramId}`, null, null, true)
    },
    async getStudyProgramsForTenant(tenantId: string): Promise<ApiResponse<StudyProgramResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudyProgramResult[]>(Method.GET, `/api/StudyProgram/${tenantId}/all`, null, null, true)
    },
    async createStudyProgram(studyProgram: StudyProgramResult): Promise<ApiResponse<StudyProgramResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudyProgramResult>(Method.POST, 'StudyProgram', studyProgram, null, true)
    },
    async updateStudyProgram(studyProgram: StudyProgramResult): Promise<ApiResponse<StudyProgramResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudyProgramResult>(Method.PUT, 'StudyProgram', studyProgram, null, true)
    },
    async deleteStudyProgram(studyProgramId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `StudyProgram/${studyProgramId}`, null, null, true)
    },
  },
})
