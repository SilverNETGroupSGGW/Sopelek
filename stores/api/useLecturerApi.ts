import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { LecturerResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { AcademicDegrees } from '~/types/apiResults/lecturers/AcademicDegrees'
import type { LecturerConflictResult } from '~/types/apiResults/lecturers/LecturerConflictResult'

export const useLecturerApi = defineStore('lecturerApi', {
  state: () => ({ }),
  actions: {
    async getLecturers(): Promise<ApiResponse<LecturerResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LecturerResult[]>(Method.GET, 'Lecturers', null, null, true)
    },
    async getLecturer(lecturerId: string): Promise<ApiResponse<LecturerResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LecturerResult>(Method.GET, `Lecturers/${lecturerId}`, null, null, true)
    },
    async getLecturerSchedule(lecturerId: string): Promise<ApiResponse<LecturerResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LecturerResult[]>(Method.GET, `Lecturers/${lecturerId}/schedule/full`, null, null, true)
    },
    async getAcademicDegrees(): Promise<ApiResponse<AcademicDegrees>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<AcademicDegrees>(Method.GET, 'Lecturers/academic-degrees', null, null, true, false)
    },
    async getLecturerDependecies(lecturerId: string): Promise<ApiResponse<LecturerConflictResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LecturerConflictResult>(Method.GET, `Lecturers/${lecturerId}/dependencies`, null, null, true)
    },
    async createLecturer(lecturer: LecturerResult): Promise<ApiResponse<LecturerResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LecturerResult>(Method.POST, 'Lecturers', lecturer, null, true)
    },
    async updateLecturer(lecturer: LecturerResult): Promise<ApiResponse<LecturerResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<LecturerResult>(Method.PUT, 'Lecturers', lecturer, null, true)
    },
    async deleteLecturer(lecturerId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Lecturers/${lecturerId}`, null, null, true)
    },
  },
})
