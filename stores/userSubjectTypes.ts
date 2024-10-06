import type { SubjectType } from '~/types'
import { useSubjectTypeApi } from './api/useSubjectTypeApi'

export const useSubjectTypes = defineStore('subjectTypes', {
  state: () => ({
    search: '',
    data: [] as SubjectType[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'isPrimitiveType', header: 'Czy typ prymitywny?' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get() {
      const subjectTypeApi = useSubjectTypeApi()
      const response = await subjectTypeApi.getSubjectTypes()

      if (!response.hasError) {
        this.data = response.data as SubjectType[]
      }
    },
    async create(subjectType: SubjectType) {
      const subjectTypeApi = useSubjectTypeApi()
      const response = await subjectTypeApi.createSubjectType(subjectType)

      if (!response.hasError) {
        this.data.push(response.data as SubjectType)
      }
    },
    async update(subjectType: SubjectType) {
      const subjectTypeApi = useSubjectTypeApi()
      const response = await subjectTypeApi.updateSubjectType(subjectType)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === response.data!.id)
        this.data[index] = response.data as SubjectType
      }
    },
    async delete(subjectType: SubjectType) {
      const subjectTypeApi = useSubjectTypeApi()
      const response = await subjectTypeApi.deleteSubjectType(subjectType.id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== subjectType.id)
      }
    },
  },
})
