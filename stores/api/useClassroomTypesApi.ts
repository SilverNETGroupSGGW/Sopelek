import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ClassroomTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useClassroomTypesApi = defineStore('classroomTypesApi', {
  state: () => ({ }),
  actions: {
    async getClassroomTypes(): Promise<ApiResponse<ClassroomTypeResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomTypeResult[]>(Method.GET, 'ClassroomTypes', null, null, true)
    },
    async getClassroomType(classroomTypeId: string): Promise<ApiResponse<ClassroomTypeResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomTypeResult>(Method.GET, `ClassroomTypes/${classroomTypeId}`, null, null, true)
    },
    async createClassroomType(classroomType: ClassroomTypeResult): Promise<ApiResponse<ClassroomTypeResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomTypeResult>(Method.POST, 'ClassroomTypes', classroomType, null, true)
    },
    async updateClassroomType(classroomType: ClassroomTypeResult): Promise<ApiResponse<ClassroomTypeResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ClassroomTypeResult>(Method.PUT, `ClassroomTypes/${classroomType.id}`, classroomType, null, true)
    },
    async deleteClassroomType(classroomTypeId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `ClassroomTypes/${classroomTypeId}`, null, null, true)
    },
  },
})
