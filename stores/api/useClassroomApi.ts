import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ClassroomResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useClassroomApi = defineStore('classroomApi', {
  state: () => ({ }),
  actions: {
    async getClassrooms(): Promise<ApiResponse<ClassroomResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomResult[]>(Method.GET, 'Classrooms', null, null, true)
    },
    async getClassroom(classroomId: string): Promise<ApiResponse<ClassroomResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomResult>(Method.GET, `Classrooms/${classroomId}`, null, null, true)
    },
    async createClassroom(classroom: ClassroomResult): Promise<ApiResponse<ClassroomResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomResult>(Method.POST, 'Classrooms', classroom, null, true)
    },
    async updateClassroom(classroom: ClassroomResult): Promise<ApiResponse<ClassroomResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomResult>(Method.PUT, 'Classrooms', classroom, null, true)
    },
    async deleteClassroom(classroomId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Classrooms/${classroomId}`, null, null, true)
    },
  },
})
