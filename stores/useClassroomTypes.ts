import type { ClassroomType } from '~/types'
import { useClassroomTypesApi } from './api/useClassroomTypesApi'

export const useClassroomTypes = defineStore('classroomTypes', {
  state: () => ({
    search: '',
    data: [] as ClassroomType[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'isPrimitiveType', header: 'Czy typ prymitywny?' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get() {
      const classroomTypesApi = useClassroomTypesApi()
      const response = await classroomTypesApi.getClassroomTypes()
      this.data = response.data as ClassroomType[]
    },
    async create(classroomType: ClassroomType) {
      const classroomTypesApi = useClassroomTypesApi()
      const response = await classroomTypesApi.createClassroomType(classroomType)

      if (!response.hasError) {
        this.data.push(response.data as ClassroomType)
      }
    },
    async update(classroomType: ClassroomType) {
      const classroomTypesApi = useClassroomTypesApi()
      const response = await classroomTypesApi.updateClassroomType(classroomType)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === response.data!.id)
        this.data[index] = response.data as ClassroomType
      }
    },
    async delete(classroomType: ClassroomType) {
      const classroomTypesApi = useClassroomTypesApi()
      const response = await classroomTypesApi.deleteClassroomType(classroomType.id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== classroomType.id)
      }
    },
  },
})
