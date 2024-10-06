import type { Classroom } from '~/types'
import type { ClassroomResult } from '~/types/apiResults'
import { useClassroomApi } from './api/useClassroomApi'

export const useClassrooms = defineStore('classrooms', {
  state: () => ({
    search: '',
    data: [] as Classroom[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'capacity', header: 'Pojemność' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get() {
      const classroomApi = useClassroomApi()
      const response = await classroomApi.getClassrooms()

      this.data = response.data!.sort((a, b) => {
        const aNumber = Number(a.name)
        const bNumber = Number(b.name)

        if (Number.isNaN(aNumber) || Number.isNaN(bNumber))
          return a.name.localeCompare(b.name)

        return aNumber - bNumber
      })
    },
    async create(classroom: Classroom) {
      const classroomApi = useClassroomApi()
      const response = await classroomApi.createClassroom(classroom as ClassroomResult)
      this.data.push(response.data as Classroom)
    },
    async update(classroom: Classroom) {
      const classroomApi = useClassroomApi()
      const response = await classroomApi.updateClassroom(classroom as ClassroomResult)
      const index = this.data.findIndex(l => l.id === response.data!.id)
      this.data[index] = response.data! as Classroom
    },
    async delete(classroom: Classroom) {
      const classroomApi = useClassroomApi()
      await classroomApi.deleteClassroom(classroom.id)
      this.data = this.data.filter(l => l.id !== classroom.id)
    },
  },
})
