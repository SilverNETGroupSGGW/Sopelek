import { SubjectType } from '~/types'
import type { DayOfWeek, Schedule, Subject } from '~/types'

export default function useCreate(schedule: Schedule, container: HTMLDivElement | null, dayOfWeek: DayOfWeek) {
  const runtimeConfig = useRuntimeConfig()

  const mouse = useMouse()

  const { onResizeDown } = useResize(schedule, container)

  function onCreateMove(event: PointerEvent) {
    if (event.button !== 0)
      return

    const target = event.target as HTMLElement

    // Prevent creating a new subject when clicking on an existing subject
    // If nearest target parent has data-lesson, it means we're clicking on an existing subject
    if (target.closest('[data-lesson]'))
      return

    let x = Math.round((event.clientX - container!.getBoundingClientRect().left - 12) / 24) * 24
    let y = Math.round((event.clientY - container!.getBoundingClientRect().top - 96) / runtimeConfig.public.groupHeight) * runtimeConfig.public.groupHeight

    // Check if x or y is outside the bounds and set them to the closest boundary
    const containerRect = container!.getBoundingClientRect()
    if (x < 0)
      x = 0
    if (y < 0)
      y = 0
    if (x > containerRect.width - 24)
      x = containerRect.width - 24
    if (y > containerRect.height - runtimeConfig.public.groupHeight)
      y = containerRect.height - runtimeConfig.public.groupHeight

    // We need to find the group by the y position
    // One group is of height runtimeConfig.public.groupHeight
    const groupIndex = Math.floor(y / runtimeConfig.public.groupHeight)
    const group = schedule.groups[groupIndex]

    // Same applies for startTime
    // 5 minutes = 24px
    // Between x = 0 and x = 24 - 08:00:00
    // Between x = 24 and x = 48 - 08:05:00
    // Between x = 48 and x = 72 - 08:10:00
    // ...
    const startTime = new Date(1970, 0, 1, 8, 0, 0)
    startTime.setMinutes(startTime.getMinutes() + Math.floor(x / 24) * 5)    

    const newSubject: Subject = {
      classroom: null,
      classroomId: null,
      comment: '',
      conflict: false,
      conflictMessage: undefined,
      dayOfWeek,
      duration: '00:05:00',
      ghost: true,
      groups: [group],
      groupsIds: [group.id],
      height: runtimeConfig.public.groupHeight,
      id: '',
      lecturers: [],
      lecturersIds: [],
      lessons: [],
      name: 'Zajęcia',
      scheduleId: schedule.id,
      startTime: startTime.toTimeString().slice(0, 8),
      type: SubjectType.Unknown,
      width: 24,
      x,
      y,
    }

    mouse.resizeEdge = 'bottom-right'
    mouse.currentSubject = newSubject
    mouse.isCreating = true

    // Add the new subject to the subjects array
    schedule.subjects.push(newSubject)

    // Trigger the resize event
    onResizeDown(event)
  }

  return {
    onCreateMove,
  }
}
