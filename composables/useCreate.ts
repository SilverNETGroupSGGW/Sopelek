import { SubjectType } from '~/types'
import type { DayOfWeek, Schedule, Subject } from '~/types'

export default function useCreate(schedule: Schedule, container: HTMLDivElement | null, dayOfWeek: DayOfWeek, scheduleId: string) {
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
    let y = Math.round((event.clientY - container!.getBoundingClientRect().top - 96) / 160) * 160

    // Check if x or y is outside the bounds and set them to the closest boundary
    const containerRect = container!.getBoundingClientRect()
    if (x < 0)
      x = 0
    if (y < 0)
      y = 0
    if (x > containerRect.width - 24)
      x = containerRect.width - 24
    if (y > containerRect.height - 160)
      y = containerRect.height - 160

    const newSubject: Subject = {
      classroom: null,
      classroomId: null,
      comment: '',
      conflict: false,
      conflictMessage: undefined,
      dayOfWeek,
      duration: '00:05:00',
      ghost: true,
      groups: [schedule.groups.find(group => group.id === target.dataset.group)!],
      groupsIds: [target.dataset.group!],
      height: 160,
      id: '',
      lecturers: [],
      lecturersIds: [],
      lessons: [],
      name: 'Zajęcia',
      scheduleId,
      startTime: target.dataset.time!,
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
    onResizeDown(event, newSubject)
  }

  return {
    onCreateMove,
  }
}
