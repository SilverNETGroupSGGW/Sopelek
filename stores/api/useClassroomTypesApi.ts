import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ClassroomTypeResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useClassroomTypesApi = defineStore('classroomTypesApi', {
  state: () => ({
  }),
  actions: {
    async getClassroomTypes(): Promise<ApiResponse<ClassroomTypeResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomTypeResult[]>(Method.GET, 'ClassroomTypes')
      return result
    },
    async getClassroomType(classroomTypeId: string): Promise<ApiResponse<ClassroomTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomTypeResult>(Method.GET, `ClassroomTypes/${classroomTypeId}`)
      return result
    },
    async createClassroomType(classroomType: ClassroomTypeResult): Promise<ApiResponse<ClassroomTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomTypeResult>(Method.POST, 'ClassroomTypes', classroomType)
      return result
    },
    async updateClassroomType(classroomType: ClassroomTypeResult): Promise<ApiResponse<ClassroomTypeResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ClassroomTypeResult>(Method.PUT, `ClassroomTypes/${classroomType.id}`, classroomType)
      return result
    },
    async deleteClassroomType(classroomTypeId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `ClassroomTypes/${classroomTypeId}`)
    },
  },
})
