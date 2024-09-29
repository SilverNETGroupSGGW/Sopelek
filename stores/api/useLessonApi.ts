import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { LessonResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { LessonOccurenceResult } from '~/types/apiResults/lesson/LessonOccurenceResult'

export const useLessonApi = defineStore('lessonApi', {
  state: () => ({ }),
  actions: {
    async getLessonsForSchedule(scheduleId: string): Promise<ApiResponse<LessonResult[]>> {
      const { makeRequest } = useApiRequest()
      return makeRequest<LessonResult[]>(Method.GET, `Lessons/schedule/${scheduleId}`, null, null, true)
    },
    async getLessonsForSubject(subjectId: string): Promise<ApiResponse<LessonResult[]>> {
      const { makeRequest } = useApiRequest()
      return makeRequest<LessonResult[]>(Method.GET, `Lessons/subject/${subjectId}`, null, null, true)
    },
    async getLesson(lessonId: string): Promise<ApiResponse<LessonResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LessonResult>(Method.GET, `Lessons/${lessonId}`, null, null, true)
    },
    async getLessonOccurences(lessonId: string): Promise<ApiResponse<LessonOccurenceResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LessonOccurenceResult[]>(Method.GET, `Lessons/${lessonId}/occurrences`, null, null, true)
    },
    async createLesson(lesson: LessonResult): Promise<ApiResponse<LessonResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LessonResult>(Method.POST, 'Lessons', lesson, null, true)
    },
    async updateLesson(lesson: LessonResult): Promise<ApiResponse<LessonResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LessonResult>(Method.PUT, 'Lessons', lesson, null, true)
    },
    async deleteLesson(lessonId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Lessons/${lessonId}`, null, null, true)
    },
  },
})
