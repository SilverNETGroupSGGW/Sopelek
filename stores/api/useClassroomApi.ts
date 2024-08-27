import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ClassroomResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useClassroomApi = defineStore('classroomApi', {
  state: () => ({
  }),
  actions: {
    async getClassrooms(): Promise<ApiResponse<ClassroomResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomResult[]>(Method.GET, 'Classrooms')
      return result
    },
    async getClassroom(classroomId: string): Promise<ApiResponse<ClassroomResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomResult>(Method.GET, `Classrooms/${classroomId}`)
      return result
    },
    async createClassroom(classroom: ClassroomResult): Promise<ApiResponse<ClassroomResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomResult>(Method.POST, 'Classrooms', classroom)
      return result
    },
    async updateClassroom(classroom: ClassroomResult): Promise<ApiResponse<ClassroomResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomResult>(Method.PUT, 'Classrooms', classroom)
      return result
    },
    async deleteClassroom(classroomId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `Classrooms/${classroomId}`)
    },
  },
})
