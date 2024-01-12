import type { Group, Subject } from '~/types'

export default function useDrag(subjects: Subject[], groups: Group[], container: HTMLDivElement | null) {
  const mouse = useMouse()
  const subjectsStore = useSubjects()

  const { calculateStartTime } = useSubject()

  let rafId: number | null = null
  const isDragging = ref(false)
  const dragStart = ref({ x: 0, y: 0 })

  function onDragDown(event: PointerEvent) {
    if (event.button !== 0)
      return

    isDragging.value = true
    dragStart.value = { x: event.clientX, y: event.clientY }
    mouse.currentSubject! = subjects.find(subject => subject.id === (event.target as HTMLElement).id)!

    // Add event listeners to window
    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragUp)
  }

  function onDragMove(event: PointerEvent) {
    if (!isDragging.value)
      return

    if (rafId !== null)
      cancelAnimationFrame(rafId)

    if (!mouse.currentSubject!)
      mouse.currentSubject! = subjects.find(subject => subject.id === (event.target as HTMLElement).id)!

    rafId = requestAnimationFrame(() => {
      // snap to 24px grid in X axis
      const deltaX = Math.round((event.clientX - dragStart.value.x) / 24) * 24

      // snap to groupCells height in Y axis
      const deltaY = Math.round((event.clientY - dragStart.value.y) / 192) * 192

      if (deltaX !== 0 || deltaY !== 0) {
        if (!mouse.currentSubject)
          return

        const newX = mouse.currentSubject!.x! + deltaX
        const newY = mouse.currentSubject!.y! + deltaY

        // Calculate the total height of groupCells
        const totalHeight = 192 * groups.length

        // Set boundaries, x and y can't be smaller than 0
        // newY can't be larger than totalHeight - mouse.currentSubject!!.height
        // newX can't be larger than container.offsetWidth - mouse.currentSubject!!.width
        mouse.currentSubject!.x = newX >= 0 ? (newX <= container!.offsetWidth - mouse.currentSubject!.width! ? newX : container!.offsetWidth! - mouse.currentSubject!.width!) : 0
        mouse.currentSubject!.y = newY >= 0 ? (newY <= totalHeight - mouse.currentSubject!.height! ? newY : totalHeight - mouse.currentSubject!.height!) : 0

        calculateStartTime(mouse.currentSubject!)

        // When previous y is smaller than current y, we need to move the subject to the next group
        // When previous y is larger than current y, we need to move the subject to the previous group
        const previousGroupIndex = Math.floor((mouse.currentSubject!.y! - deltaY) / 192)
        const currentGroupIndex = Math.floor(mouse.currentSubject!.y! / 192)

        mouse.currentSubject!.groups = groups.slice(currentGroupIndex, currentGroupIndex + 1)
        if (previousGroupIndex !== currentGroupIndex)
          mouse.currentSubject!.groups = groups.slice(currentGroupIndex, currentGroupIndex + 1)

        mouse.currentSubject!.groupsIds = mouse.currentSubject!.groups!.length > 0
          ? mouse.currentSubject!.groups!.map(group => group.id)
          : []

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

  function onDragUp() {
    isDragging.value = false

    if (mouse.currentSubject!) {
      subjectsStore.update(mouse.currentSubject!)
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
