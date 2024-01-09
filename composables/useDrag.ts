import type { Group, Subject } from '~/types'

export default function useDrag(subjects: Subject[], groups: Group[], container: HTMLDivElement | null) {
  const { calculateStartTime } = useSubject()

  let rafId: number | null = null
  const isDragging = ref(false)
  const currentSubject = ref<Subject | null>(null)
  const dragStart = ref({ x: 0, y: 0 })

  function onDragDown(event: PointerEvent) {
    if (event.button !== 0)
      return

    isDragging.value = true
    dragStart.value = { x: event.clientX, y: event.clientY }
    currentSubject.value = subjects.find(subject => subject.id === (event.target as HTMLElement).id)!

    // Add event listeners to window
    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragUp)
  }

  function onDragMove(event: PointerEvent) {
    if (!isDragging.value)
      return

    if (rafId !== null)
      cancelAnimationFrame(rafId)

    if (!currentSubject.value)
      currentSubject.value = subjects.find(subject => subject.id === (event.target as HTMLElement).id)!

    rafId = requestAnimationFrame(() => {
      // snap to 24px grid in X axis
      const deltaX = Math.round((event.clientX - dragStart.value.x) / 24) * 24

      // snap to groupCells height in Y axis
      const deltaY = Math.round((event.clientY - dragStart.value.y) / 192) * 192

      if (deltaX !== 0 || deltaY !== 0) {
        const newX = currentSubject.value!.x! + deltaX
        const newY = currentSubject.value!.y! + deltaY

        // Calculate the total height of groupCells
        const totalHeight = 192 * groups.length

        // Set boundaries, x and y can't be smaller than 0
        // newY can't be larger than totalHeight - currentSubject.value!.height
        // newX can't be larger than container.offsetWidth - currentSubject.value!.width
        currentSubject.value!.x = newX >= 0 ? (newX <= container!.offsetWidth - currentSubject.value!.width! ? newX : container!.offsetWidth! - currentSubject.value!.width!) : 0
        currentSubject.value!.y = newY >= 0 ? (newY <= totalHeight - currentSubject.value!.height! ? newY : totalHeight - currentSubject.value!.height!) : 0

        calculateStartTime(currentSubject.value!)

        // Update dragStart based on the actual movement of the element
        dragStart.value = { x: dragStart.value.x + deltaX, y: dragStart.value.y + deltaY }
      }
    })
  }

  function onDragUp() {
    isDragging.value = false
    currentSubject.value = null

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
