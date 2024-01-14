import type { DayOfWeek, Schedule, Subject, SubjectConflict } from '~/types'

export const useScheduler = defineStore('scheduler', {
  state: () => ({
    schedule: null as Schedule | null,
    conflicts: [] as SubjectConflict[],
  }),
  getters: {
    getSubjectsByDay: state => (day: DayOfWeek) => {
      return state.schedule!.subjects.filter(subject => subject.dayOfWeek === day) as Subject[]
    },
  },
  actions: {
    async get(scheduleId: string) {
      const { calculatePosition } = useSubject()

      const data = await $fetch<Schedule>(`schedules/${scheduleId}/extended`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'GET',
      })

      data.subjects = data.subjects.map((subject) => {
        const { x, y, width, height } = calculatePosition(subject, data.groups.map(x => x.name))
        return {
          ...subject,
          conflict: false,
          conflictMessage: '',

          classroomId: subject.classroom?.id ?? null,
          lecturersIds: subject.lecturers?.map(lecturer => lecturer.id) ?? [],
          groupsIds: subject.groups?.map(group => group.id!) ?? [],

          x,
          y,
          width,
          height,
        }
      })

      this.schedule = data
    },
    async getConflicts(scheduleId: string, dayOfWeek: DayOfWeek) {
      this.conflicts = await $fetch<SubjectConflict[]>(`Subjects/check-conflict`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        body: JSON.stringify({
          scheduleId,
          groups: [...new Set(this.schedule!.subjects.map(subject => subject.groupsIds).flat())],
          dayOfWeek,
        }),
      })
    },
  },
})
