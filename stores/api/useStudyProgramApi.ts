import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { StudyProgramResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useStudyProgramApi = defineStore('studyProgramApi', {
  state: () => ({
  }),
  actions: {
    async getStudyPrograms(): Promise<ApiResponse<StudyProgramResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<StudyProgramResult[]>(Method.GET, 'StudyProgram/all')
      return result
    },
    async getStudyProgram(studyProgramId: string): Promise<ApiResponse<StudyProgramResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<StudyProgramResult>(Method.GET, `StudyProgram/${studyProgramId}`)
      return result
    },
    async createStudyProgram(studyProgram: StudyProgramResult): Promise<ApiResponse<StudyProgramResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<StudyProgramResult>(Method.POST, 'StudyProgram', studyProgram)
      return result
    },
    async updateStudyProgram(studyProgram: StudyProgramResult): Promise<ApiResponse<StudyProgramResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<StudyProgramResult>(Method.PUT, 'StudyProgram', studyProgram)
      return result
    },
    async deleteStudyProgram(studyProgramId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `StudyProgram/${studyProgramId}`)
    },
  },
})
