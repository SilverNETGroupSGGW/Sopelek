import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { LessonResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useLecturerApi = defineStore('lecturerApi', {
  state: () => ({
  }),
  actions: {
    async getLecturers(): Promise<ApiResponse<LessonResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<LessonResult[]>(Method.GET, 'Lecturers')
      return result
    },
    async getLecturer(lecturerId: string): Promise<ApiResponse<LessonResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<LessonResult>(Method.GET, `Lecturers/${lecturerId}`)
      return result
    },
    async createLecturer(lecturer: LessonResult): Promise<ApiResponse<LessonResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<LessonResult>(Method.POST, 'Lecturers', lecturer)
      return result
    },
    async updateLecturer(lecturer: LessonResult): Promise<ApiResponse<LessonResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<LessonResult>(Method.PUT, 'Lecturers', lecturer)
      return result
    },
    async deleteLecturer(lecturerId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `Lecturers/${lecturerId}`)
    },
  },
})
