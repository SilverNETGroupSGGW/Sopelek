import { DayOfWeek, type Group, type Subject, SubjectType } from '~/types'

export default function useCreate(subjects: Subject[], groups: Group[], container: HTMLDivElement | null, scheduleId: string) {
  const mouse = useMouse()

  const { onResizeDown } = useResize(subjects, groups, container)

  function onCreateMove(event: PointerEvent) {
    if (event.button !== 0)
      return

    const target = event.target as HTMLElement

    // Prevent creating a new subject when clicking on an existing subject
    if (target.id)
      return

    let x = Math.round((event.clientX - container!.getBoundingClientRect().left - 12) / 24) * 24
    let y = Math.round((event.clientY - container!.getBoundingClientRect().top) / 192) * 192

    // Check if x or y is outside the bounds and set them to the closest boundary
    const containerRect = container!.getBoundingClientRect()
    if (x < 0)
      x = 0
    if (y < 0)
      y = 0
    if (x > containerRect.width - 24)
      x = containerRect.width - 24
    if (y > containerRect.height - 192)
      y = containerRect.height - 192

    const newSubject: Subject = {
      comment: '',
      ghost: true,
      groupsIds: [],
      height: 192,
      id: '',
      lecturersIds: [],
      name: 'Zajęcia',
      scheduleId,
      startTime: target.dataset.time!,
      duration: '01:30:00',
      type: SubjectType.Unknown,
      dayOfWeek: DayOfWeek.Monday,
      width: 24,
      x,
      y,
    }

    mouse.resizeEdge = 'bottom-right'
    mouse.currentSubject = newSubject
    mouse.isCreating = true

    // Add the new subject to the subjects array
    subjects.push(newSubject)

    // Trigger the resize event
    onResizeDown(event, newSubject)
  }

  return {
    onCreateMove,
  }
}
