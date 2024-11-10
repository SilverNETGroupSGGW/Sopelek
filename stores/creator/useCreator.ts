import { useToast } from 'vue-toastification'
import { DayOfWeek, type Subject } from '~/types'
import type { ScheduleResult, SubjectResult } from '~/types/apiResults'
import type { CreatorGroup } from '~/types/creator/CreatorGroup'
import type { SubjectPosition } from '~/types/creator/SubjectPosition'
import { useGroupApi } from '../api/useGroupApi'
import { useScheduleApi } from '../api/useScheduleApi'
import { useSubjectApi } from '../api/useSubjectApi'

export const useCreator = defineStore('creator', {
  state: () => ({
    // Data
    schedule: null as ScheduleResult | null,
    groups: null as CreatorGroup[] | null,
    subjects: null as SubjectResult[] | null,

    // UI Information
    isLoading: true as boolean,
    dayOfWeek: DayOfWeek.Monday as DayOfWeek,
    subjectsPositions: [] as SubjectPosition[],

    // Header settings
    intervalHeaderTimeDescription: 60,
    meshCountBeetwenHeaderTime: 4,
    startHour: 8,
    endHour: 20,

    // Size
    edgeThreshold: 16 as number, // resize and drag bounds
    intervalHeight: 32 as number, // height of a group cell,
    intervalWidth: 24 as number, // width of 5 minutes interval cell
    groupHeaderColumnWidth: 100 as number,
  }),
  getters: {
    getSubjectsByDay: state => (day: DayOfWeek[]) => {
      return state.subjects!.filter(subject => subject.dayOfWeek! === day.toString())
    },
    getHeaderInitialDate: (state) => {
      return new Date(1970, 0, 1, state.startHour, 0, 0, 0)
    },
    timeRange: (state): Date[] => {
      const result = [] as Date[]
      const initialDate = new Date(1970, 0, 1, state.startHour, 0, 0, 0)

      while (initialDate.getHours() < state.endHour || (initialDate.getHours() === state.endHour && initialDate.getMinutes() === 0)) {
        result.push(new Date(initialDate.getTime()))
        initialDate.setMinutes(initialDate.getMinutes() + state.intervalHeaderTimeDescription)
      }

      return result
    },
    filteredSubjects: state => (dayOfWeek: DayOfWeek): SubjectResult[] => {
      return (state.subjects ?? []).filter(subject => subject.dayOfWeek === dayOfWeek.toString())
    },
  },
  actions: {
    initializeWatchers() {
      watch(
        () => [
          this.groups,
          this.intervalWidth,
          this.intervalHeight,
          this.meshCountBeetwenHeaderTime,
          this.intervalHeaderTimeDescription,
          this.startHour,
          this.endHour,
          this.dayOfWeek,
        ],
        () => {
          this.subjectsPositions = this.filteredSubjects(this.dayOfWeek).map((subject: SubjectResult) => this.calculatePosition(subject)) ?? []
        },
        { deep: true },
      )
    },
    async get(scheduleId: string): Promise<void> {
      this.initializeWatchers()

      const scheduleApi = useScheduleApi()
      const subjectApi = useSubjectApi()
      const groupApi = useGroupApi()
      const toast = useToast()

      const schedulePromise = scheduleApi.getSchedule(scheduleId)
      const subjectsPromise = subjectApi.getSubjectsForSchedule(scheduleId)
      const groupsPromise = groupApi.getGroupsForSchedule(scheduleId)

      const scheduleResponse = await schedulePromise
      const subjectsResponse = await subjectsPromise
      const groupsResponse = await groupsPromise

      if (scheduleResponse.hasError || subjectsResponse.hasError || groupsResponse.hasError) {
        toast.error('Coś poszło nie tak. W razie problemów skontaktuj się z administratorem.')
        return
      }

      this.schedule = scheduleResponse.data
      this.subjects = subjectsResponse.data
      this.groups = groupsResponse.data!.map<CreatorGroup>((group, i) => ({ id: group.id, name: group.name, order: i }))

      this.subjectsPositions = this.subjects!.map((subject) => {
        return this.calculatePosition(subject)
      })

      this.isLoading = false
    },
    calculatePosition(subject: SubjectResult): SubjectPosition {
      const startTime = new Date(`1970-01-01T${subject.startTime}`)
      const axisStartTime = new Date(`1970-01-01T${String(this.startHour).padStart(2, '0')}:00:00`)
      const axisGroupCount = this.groups!.length

      const duration = this.convertTimeSpanToDate(subject.duration!)
      const hours = duration.getHours()
      const minutes = duration.getMinutes()
      const seconds = duration.getSeconds()

      const durationInMilliseconds = this.getMilliseconds(hours, minutes, seconds)
      const endTime = new Date(startTime.getTime() + durationInMilliseconds)

      const groupIndex = this.groups!.findIndex(group => subject.groupsIds.includes(group.id))

      const x = this.calculateCardXPosition(axisStartTime, startTime)
      const y = this.calculateCardYPosition(groupIndex)
      const width = this.calculateCardWidth(startTime, endTime)
      const height = this.calculateCardHeight(subject.groupsIds.length)

      return {
        subjectId: subject.id,
        x,
        y,
        width,
        height,
      }
    },
    calculateCardXPosition(axisStartTime: Date, startTime: Date): number {
      const pixelsPerHour = this.intervalWidth * this.meshCountBeetwenHeaderTime
      const pixelsPerMinute = pixelsPerHour / 60

      const xHours = (startTime.getHours() - axisStartTime.getHours()) * pixelsPerHour
      const xMinutes = startTime.getMinutes() * pixelsPerMinute

      // If header time description is different than 60 minutes then adjust the result
      const result = (xHours + xMinutes) / (this.intervalHeaderTimeDescription / 60)
      return result
    },
    calculateCardYPosition(groupIndex: number): number {
      return groupIndex * this.intervalHeight
    },
    calculateCardWidth(startTime: Date, endTime: Date): number {
      const pixelsPerHour = this.intervalWidth * this.meshCountBeetwenHeaderTime
      const pixelsPerMinute = pixelsPerHour / 60

      const widthHours = (endTime.getHours() - startTime.getHours()) * pixelsPerHour
      const widthMinutes = (endTime.getMinutes() - startTime.getMinutes()) * pixelsPerMinute

      // If header time description is different than 60 minutes then adjust the result
      const result = (widthHours + widthMinutes) / (this.intervalHeaderTimeDescription / 60)
      return result
    },
    calculateCardHeight(groupsCount: number): number {
      return groupsCount * this.intervalHeight
    },
    getMilliseconds(hours: number, minutes: number, seconds: number): number {
      return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
    },
    calculateHeaderTimeRange() {
      const initialDate = this.getHeaderInitialDate

      while (initialDate.getHours() < this.endHour || (initialDate.getHours() === this.endHour && initialDate.getMinutes() === 0)) {
        this.timeRange.push(new Date(initialDate.getTime()))
        initialDate.setMinutes(initialDate.getMinutes() + this.intervalHeaderTimeDescription)
      }
    },
    convertTimeSpanToDate(timeSpan: string): Date {
      return new Date(`1970-01-01T${timeSpan}`)
    },

    // async getConflicts(scheduleId: string, dayOfWeek: DayOfWeek) {
    //   const subjectApi = useSubjectApi()

    //   const subjectConflictQuery = {
    //     scheduleId: schedule
    //     groups: string[]
    //     dayOfWeek: string // 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
    //     startTime: string // Time in "HH:mm:ss" format
    //     duration: string // Time in "HH:mm:ss" format
    //   }
    //   subjectApi.checkSubjectConflicts()

    //   const runtimeConfig = useRuntimeConfig()
    //   const data = await $fetch<SubjectConflict>(`subjects/check-conflict`, {
    //     baseURL: runtimeConfig.public.baseURL,
    //     method: 'POST',
    //     body: JSON.stringify({
    //       scheduleId,
    //       groups: this.schedule?.groups.map(group => group.id) ?? [],
    //       dayOfWeek,
    //       startTime: '08:00:00',
    //       duration: '12:00:00',
    //     }),
    //   })

    //   data.conflicts.forEach((conflict) => {
    //     const mainSubject = this.schedule?.subjects.find(subject => subject.id === conflict.mainSubject.id)
    //     const otherSubject = this.schedule?.subjects.find(subject => subject.id === conflict.otherSubject.id)

    //     if (mainSubject) {
    //       mainSubject.conflict = true
    //       mainSubject.conflictMessage = conflict.mainSubject.conflictMessage
    //     }

    //     if (otherSubject) {
    //       otherSubject.conflict = true
    //       otherSubject.conflictMessage = conflict.otherSubject.conflictMessage
    //     }
    //   })
    // },
    // calculateStartTime(subject: Subject) {
    //   const baseTime = new Date()
    //   baseTime.setHours(8, 0, 0, 0)

    //   const minutesFromBase = (subject.x! / intervalWidth) * 5
    //   const newTime = new Date(baseTime.getTime() + minutesFromBase * 60000)
    //   const hours = newTime.getHours() < 10 ? `0${newTime.getHours()}` : newTime.getHours()
    //   const minutes = newTime.getMinutes() < 10 ? `0${newTime.getMinutes()}` : newTime.getMinutes()
    //   subject.startTime = `${hours}:${minutes}:00`
    // },
    // calculateGroups(subject: Subject) {
    //   const currentGroupIndex = subject.y! / intervalHeight
    //   const newGroupCount = subject.height! / intervalHeight
    //   subject.groups = subject.groups!.slice(currentGroupIndex, currentGroupIndex + newGroupCount)
    // },
  },
})
