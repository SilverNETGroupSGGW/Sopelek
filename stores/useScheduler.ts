import type { BaseResponse, DayOfWeek, Schedule, SubjectConflict } from '~/types'

export const useScheduler = defineStore('scheduler', {
  state: () => ({
    schedule: null as Schedule | null,
  }),
  getters: {
    getSubjectsByDay: state => (day: DayOfWeek[]) => {
      return state.schedule!.subjects
        .filter(subject => !!subject.dayOfWeek)
        .filter(subject => day.includes(subject.dayOfWeek!) && subject.groups && subject.groups.length > 0)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .map((subject, index) => ({ ...subject, zIndex: index + 1 }))
    },
  },
  actions: {
    async get(scheduleId: string) {
      const runtimeConfig = useRuntimeConfig()
      const { calculatePosition } = useSubject()

      const { data } = await useFetch<BaseResponse<Schedule>>(`schedules/${scheduleId}/extended`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
      })

      data.value!.data.subjects = data.value!.data.subjects.map((subject) => {
        const { x, y, width, height } = calculatePosition(subject, data.value!.data.groups.map(x => x.name))
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

      this.schedule = data.value!.data
    },
    async getConflicts(scheduleId: string, dayOfWeek: DayOfWeek) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<SubjectConflict>(`subjects/check-conflict`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify({
          scheduleId,
          groups: this.schedule?.groups.map(group => group.id) ?? [],
          dayOfWeek,
          startTime: '08:00:00',
          duration: '12:00:00',
        }),
      })

      data.conflicts.forEach((conflict) => {
        const mainSubject = this.schedule?.subjects.find(subject => subject.id === conflict.mainSubject.id)
        const otherSubject = this.schedule?.subjects.find(subject => subject.id === conflict.otherSubject.id)

        if (mainSubject) {
          mainSubject.conflict = true
          mainSubject.conflictMessage = conflict.mainSubject.conflictMessage
        }

        if (otherSubject) {
          otherSubject.conflict = true
          otherSubject.conflictMessage = conflict.otherSubject.conflictMessage
        }
      })
    },
  },
})
