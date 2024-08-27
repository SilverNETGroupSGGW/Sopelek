import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { LessonResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useLessonApi = defineStore('lessonApi', {
  state: () => ({
  }),
  actions: {
    getLessonsForSubject(subjectId: string): Promise<ApiResponse<LessonResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = makeRequest<LessonResult[]>(Method.GET, `Lessons/subject/${subjectId}`)
      return result
    },
    async getLesson(lessonId: string): Promise<ApiResponse<LessonResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<LessonResult>(Method.GET, `Lessons/${lessonId}`)
      return result
    },
    async createLesson(lesson: LessonResult): Promise<ApiResponse<LessonResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<LessonResult>(Method.POST, 'Lessons', lesson)
      return result
    },
    async updateLesson(lesson: LessonResult): Promise<ApiResponse<LessonResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<LessonResult>(Method.PUT, 'Lessons', lesson)
      return result
    },
    async deleteLesson(lessonId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `Lessons/${lessonId}`)
    },
  },
})
