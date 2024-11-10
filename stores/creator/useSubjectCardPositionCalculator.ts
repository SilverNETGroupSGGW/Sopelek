import type { Subject } from '~/types'
import type { SubjectPosition } from '~/types/creator/SubjectPosition'

// Constants for calculating position of a subject
export const useSubjectCardPositionCalculator = defineStore('subjectCardPositionCalculator', {
  state: () => ({
    edgeThreshold: 16 as number, // resize and drag bounds
    intervalHeight: 160 as number, // height of a group cell,
    intervalWidth: 24 as number, // width of 5 minutes interval cell
  }),
  getters: { },
  actions: {
    async calculatePosition(subject: Subject, groups: string[]): Promise<SubjectPosition> {
      const startTime = new Date(`1970-01-01T${subject.startTime}`)

      const [hours, minutes, seconds] = subject.duration!.split(':').map(Number)
      const duration = new Date(`1970-01-01T00:00:00Z`)
      duration.setHours(hours, minutes, seconds)

      const durationInMilliseconds = this.getMilliseconds(hours, minutes, seconds)
      const endTime = new Date(startTime.getTime() + durationInMilliseconds)

      const x = ((startTime.getHours() - 8) * 60
        + startTime.getMinutes())
        * (this.intervalWidth / 5) // startTime total minutes * interval width

      const y = groups.findIndex(group =>
        subject.groups!.some(subjectGroup => subjectGroup.name === group))
        * this.intervalHeight

      const height = subject.groups!.length * this.intervalHeight
      const width = ((endTime.getHours() * 60 + endTime.getMinutes())
        - (startTime.getHours() * 60 + startTime.getMinutes())) * 4.8

      return { subjectId: subject.id, x, y, width, height }
    },
    async calculateStartTime(subject: Subject) {
      const baseTime = new Date()
      baseTime.setHours(8, 0, 0, 0)

      const minutesFromBase = (subject.x! / this.intervalWidth) * 5
      const newTime = new Date(baseTime.getTime() + minutesFromBase * 60000)
      const hours = newTime.getHours() < 10
        ? `0${newTime.getHours()}`
        : newTime.getHours()
      const minutes = newTime.getMinutes() < 10
        ? `0${newTime.getMinutes()}`
        : newTime.getMinutes()
      subject.startTime = `${hours}:${minutes}:00`
    },
    async calculateGroups(subject: Subject) {
      const currentGroupIndex = subject.y! / this.intervalHeight
      const newGroupCount = subject.height! / this.intervalHeight
      subject.groups = subject.groups!.slice(currentGroupIndex, currentGroupIndex + newGroupCount)
    },
    getMilliseconds(hours: number, minutes: number, seconds: number): number {
      return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
    },
  },
})
