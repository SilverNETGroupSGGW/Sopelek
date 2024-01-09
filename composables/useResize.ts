import type { Group, Subject } from '~/types'

export default function useResize(subjects: Subject[], groups: Group[], container: HTMLDivElement | null) {
  const mouse = useMouse()

  const { onDragDown } = useDrag(subjects, groups, container)
  const { calculateStartTime } = useSubject()

  let rafId: number | null = null
  const initialResizeEdge = ref<null | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'top' | 'bottom'>(null)
  const resizeStart = ref({ x: 0, y: 0, width: 0, height: 0 })

  const edgeThreshold = 16

  function onPointerDown(event: PointerEvent, subject: Subject) {
    if (event.button !== 0 || (event.target as HTMLElement).id.startsWith('link-'))
      return

    // Determine if we're dragging or resizing
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    if (Math.abs(event.clientX - rect.left) < edgeThreshold || Math.abs(event.clientX - rect.right) < edgeThreshold || Math.abs(event.clientY - rect.top) < edgeThreshold || Math.abs(event.clientY - rect.bottom) < edgeThreshold) {
      // We're resizing
      onResizeDown(event, subject)
    }
    else {
      // We're dragging
      onDragDown(event)
    }
  }

  function onResizeDown(event: PointerEvent, subject: Subject) {
    mouse.isResizing = true
    resizeStart.value = { x: event.clientX, y: event.clientY, width: subject.width!, height: subject.height! }
    mouse.currentSubject = subject

    if (!mouse.isCreating) {
      // Determine which edge we're resizing
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      const nearLeft = Math.abs(event.clientX - rect.left) < edgeThreshold
      const nearRight = Math.abs(event.clientX - rect.right) < edgeThreshold
      const nearTop = Math.abs(event.clientY - rect.top) < edgeThreshold
      const nearBottom = Math.abs(event.clientY - rect.bottom) < edgeThreshold

      if (nearTop && nearLeft)
        mouse.resizeEdge = 'top-left'
      else if (nearTop && nearRight)
        mouse.resizeEdge = 'top-right'
      else if (nearBottom && nearLeft)
        mouse.resizeEdge = 'bottom-left'
      else if (nearBottom && nearRight)
        mouse.resizeEdge = 'bottom-right'
      else if (nearLeft)
        mouse.resizeEdge = 'left'
      else if (nearRight)
        mouse.resizeEdge = 'right'
      else if (nearTop)
        mouse.resizeEdge = 'top'
      else if (nearBottom)
        mouse.resizeEdge = 'bottom'
    }

    // Store the initial resize direction
    initialResizeEdge.value = mouse.resizeEdge

    // Add event listeners to window
    window.addEventListener('pointermove', onResizeMove)
    window.addEventListener('pointerup', onResizeUp)
  }

  function onResizeMove(event: PointerEvent) {
    // Early return if not resizing or no current subject
    if (!mouse.isResizing || !mouse.currentSubject)
      return

    // Cancel any existing animation frame request
    if (rafId !== null)
      cancelAnimationFrame(rafId)

    rafId = requestAnimationFrame(() => {
      // Calculate the change in x and y positions
      const deltaX = Math.round((event.clientX - resizeStart.value.x) / 24) * 24
      const deltaY = Math.round((event.clientY - resizeStart.value.y) / 192) * 192

      let newWidth, newHeight, newX, newY

      // Calculate the total height of the group cells
      const totalHeight = groups.length * 192

      switch (initialResizeEdge.value) {
        case 'top-left':
          newWidth = Math.max(0, resizeStart.value.width - deltaX)
          newX = mouse.currentSubject!.x! + (mouse.currentSubject!.width! - newWidth)
          newHeight = Math.max(0, resizeStart.value.height - deltaY)
          newY = mouse.currentSubject!.y! + (mouse.currentSubject!.height! - newHeight)
          if (newX >= 0 && newY >= 0) {
            mouse.currentSubject!.width = newWidth
            mouse.currentSubject!.height = newHeight
            mouse.currentSubject!.x = newX
            mouse.currentSubject!.y = newY
          }
          break
        case 'top-right':
          newWidth = Math.max(0, resizeStart.value.width + deltaX)
          newHeight = Math.max(192, resizeStart.value.height - deltaY)
          newY = mouse.currentSubject!.y! + (mouse.currentSubject!.height! - newHeight)
          mouse.currentSubject!.width = newWidth
          if (newY >= 0) {
            mouse.currentSubject!.height = newHeight
            mouse.currentSubject!.y = newY
          }
          break
        case 'bottom-left':
          newWidth = Math.max(0, resizeStart.value.width - deltaX)
          newX = mouse.currentSubject!.x! + (mouse.currentSubject!.width! - newWidth)
          newHeight = Math.max(0, resizeStart.value.height + deltaY)
          if (newX >= 0 && newX + newWidth <= container!.offsetWidth) {
            mouse.currentSubject!.width = newWidth
            mouse.currentSubject!.x = newX
          }
          if (mouse.currentSubject!.y! + newHeight <= totalHeight)
            mouse.currentSubject!.height = newHeight

          break
        case 'bottom-right':
          newWidth = Math.max(0, resizeStart.value.width + deltaX)
          newHeight = Math.max(0, resizeStart.value.height + deltaY)
          if (mouse.currentSubject!.x! + newWidth <= container!.offsetWidth)
            mouse.currentSubject!.width = newWidth

          if (mouse.currentSubject!.y! + newHeight <= totalHeight)
            mouse.currentSubject!.height = newHeight

          break
        case 'left':
          newWidth = Math.max(0, resizeStart.value.width - deltaX)
          newX = mouse.currentSubject!.x! + (mouse.currentSubject!.width! - newWidth)
          if (newX >= 0) {
            mouse.currentSubject!.width = newWidth
            mouse.currentSubject!.x = newX
          }
          break
        case 'right':
          newWidth = Math.min(container!.offsetWidth - mouse.currentSubject!.x!, Math.max(0, resizeStart.value.width + deltaX))
          mouse.currentSubject!.width = newWidth
          break
        case 'top':
          newHeight = Math.max(192, resizeStart.value.height - deltaY)
          newY = mouse.currentSubject!.y! + (mouse.currentSubject!.height! - newHeight)
          if (newY >= 0) {
            mouse.currentSubject!.height = newHeight
            mouse.currentSubject!.y = newY
          }
          break
        case 'bottom':
          newHeight = Math.min(totalHeight - mouse.currentSubject!.y!, Math.max(192, resizeStart.value.height + deltaY))
          mouse.currentSubject!.height = newHeight
          break
      }

      const hours: number | string = Math.floor(mouse.currentSubject!.width! / 4.8 / 60)
      const minutes: number | string = Math.round(mouse.currentSubject!.width! / 4.8 % 60)
      const duration = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:00`
      mouse.currentSubject!.duration = duration

      calculateStartTime(mouse.currentSubject!)
    })
  }

  async function onResizeUp() {
    if (mouse.isCreating) {
      // TODO: Move business logic outside maths
      await $fetch('subjects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api/',
        body: JSON.stringify(mouse.currentSubject),
      })
      mouse.isCreating = false
    }

    mouse.isResizing = false
    mouse.isCreating = false
    // Drop the ghost class
    mouse.currentSubject!.ghost = false
    mouse.currentSubject = null

    // Remove event listeners from window
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)

    initialResizeEdge.value = null
  }

  return {
    onPointerDown,
    onResizeDown,
    onResizeMove,
    onResizeUp,
  }
}
