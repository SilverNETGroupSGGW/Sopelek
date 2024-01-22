import type { Schedule } from '~/types'

export default function useDrag(schedule: Schedule, container: HTMLDivElement | null) {
  const mouse = useMouse()
  const subjectsStore = useSubjects()
  // const schedulerStore = useScheduler()

  const { calculateStartTime } = useSubject()

  let rafId: number | null = null
  const dragStart = ref({ x: 0, y: 0 })

  function onDragDown(event: MouseEvent | PointerEvent) {
    if (event.button !== 0)
      return

    mouse.isDragging = true
    dragStart.value = { x: event.clientX, y: event.clientY }
    mouse.currentSubject! = schedule.subjects.find(subject => subject.id === (event.target as HTMLElement).id)!

    // Add event listeners to window
    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragUp)
  }

  function onDragMove(event: PointerEvent) {
    if (!mouse.isDragging)
      return

    if (rafId !== null)
      cancelAnimationFrame(rafId)

    if (!mouse.currentSubject!)
      mouse.currentSubject! = schedule.subjects.find(subject => subject.id === (event.target as HTMLElement).id)!

    rafId = requestAnimationFrame(() => {
      // snap to 24px grid in X axis
      const deltaX = Math.round((event.clientX - dragStart.value.x) / 24) * 24

      // snap to groupCells height in Y axis
      const deltaY = Math.round((event.clientY - dragStart.value.y) / 160) * 160

      if (deltaX !== 0 || deltaY !== 0) {
        if (!mouse.currentSubject)
          return

        const newX = mouse.currentSubject!.x! + deltaX
        const newY = mouse.currentSubject!.y! + deltaY

        // Calculate the total height of groupCells
        const totalHeight = 160 * schedule.groups.length

        // Set boundaries, x and y can't be smaller than 0
        // newY can't be larger than totalHeight - mouse.currentSubject!!.height
        // newX can't be larger than container.offsetWidth - mouse.currentSubject!!.width
        mouse.currentSubject!.x = newX >= 0 ? (newX <= container!.offsetWidth - mouse.currentSubject!.width! ? newX : container!.offsetWidth! - mouse.currentSubject!.width!) : 0
        mouse.currentSubject!.y = newY >= 0 ? (newY <= totalHeight - mouse.currentSubject!.height! ? newY : totalHeight - mouse.currentSubject!.height!) : 0

        calculateStartTime(mouse.currentSubject!)

        // Calculate new groups
        const currentGroupIndex = mouse.currentSubject.y! / 160
        const newGroupCount = mouse.currentSubject.height! / 160
        mouse.currentSubject.groups = schedule.groups.slice(currentGroupIndex, currentGroupIndex + newGroupCount)!
        mouse.currentSubject.groupsIds = mouse.currentSubject?.groups!.map(group => group.id)

        mouse.currentSubject!.lecturersIds = mouse.currentSubject!.lecturers!.length > 0
          ? mouse.currentSubject!.lecturers!.map(lecturer => lecturer.id)
          : []

        if (mouse.currentSubject!.classroom)
          mouse.currentSubject!.classroomId = mouse.currentSubject!.classroom!.id

        // Update dragStart based on the actual movement of the element
        dragStart.value = { x: dragStart.value.x + deltaX, y: dragStart.value.y + deltaY }
      }
    })
  }

  async function onDragUp() {
    // If the mouse is not dragging or copying, return immediately
    if (!mouse.isDragging && !mouse.isCopying)
      return

    mouse.isDragging = false

    if (mouse.isCopying) {
      mouse.isCopying = false
      mouse.currentSubject!.ghost = false
    }

    if (mouse.currentSubject!) {
      const subject = await subjectsStore.update(mouse.currentSubject!)

      // When copying, reassign the id of the subject to the new one
      if (schedule.subjects.some(subject => subject.id === 'create'))
        schedule.subjects.find(subject => subject.id === 'create')!.id = subject!.id

      // await schedulerStore.getConflicts(schedule.id, dayOfWeek)
      mouse.currentSubject = null
    }

    // Remove event listeners from window
    window.removeEventListener('pointermove', onDragMove)
    window.removeEventListener('pointerup', onDragUp)
  }

  return {
    onDragDown,
    onDragMove,
    onDragUp,
  }
}
