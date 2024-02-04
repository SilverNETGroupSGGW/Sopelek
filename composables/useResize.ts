import type { Schedule, Subject } from '~/types'

export default function useResize(schedule: Schedule, container: HTMLDivElement | null) {
  const runtimeConfig = useRuntimeConfig()

  const mouse = useMouse()
  const subjectsStore = useSubjects()

  const { calculateStartTime } = useSubject()

  let rafId: number | null = null
  const initialResizeEdge = ref<null | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'top' | 'bottom'>(null)
  const resizeStart = ref({ x: 0, y: 0, width: 0, height: 0 })

  function onResizeDown(event: PointerEvent) {
    if (!mouse.isCreating)
      mouse.currentSubject! = schedule.subjects.find(subject => subject.id === (event.target as HTMLElement).id)!

    if (!mouse.currentSubject)
      return

    mouse.isResizing = true
    resizeStart.value = { x: event.clientX, y: event.clientY, width: mouse.currentSubject!.width!, height: mouse.currentSubject!.height! }

    if (!mouse.isCreating) {
      // Determine which edge we're resizing
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      const nearLeft = Math.abs(event.clientX - rect.left) < runtimeConfig.public.edgeThreshold
      const nearRight = Math.abs(event.clientX - rect.right) < runtimeConfig.public.edgeThreshold
      const nearTop = Math.abs(event.clientY - rect.top) < runtimeConfig.public.edgeThreshold
      const nearBottom = Math.abs(event.clientY - rect.bottom) < runtimeConfig.public.edgeThreshold

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
      const deltaX = Math.round((event.clientX - resizeStart.value.x) / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
      const deltaY = Math.round((event.clientY - resizeStart.value.y) / runtimeConfig.public.groupHeight) * runtimeConfig.public.groupHeight

      const minWidth = runtimeConfig.public.intervalWidth
      const minHeight = runtimeConfig.public.groupHeight

      let newWidth, newHeight, newX, newY

      // Calculate the total height of the group cells
      const totalHeight = schedule.groups.length * runtimeConfig.public.groupHeight

      switch (initialResizeEdge.value) {
        case 'top-left':
          newWidth = Math.max(minWidth, resizeStart.value.width - deltaX)
          newX = mouse.currentSubject!.x! + (mouse.currentSubject!.width! - newWidth)
          newHeight = Math.max(minHeight, resizeStart.value.height - deltaY)
          newY = mouse.currentSubject!.y! + (mouse.currentSubject!.height! - newHeight)
          if (newX >= 0 && newY >= 0) {
            mouse.currentSubject!.width = newWidth
            mouse.currentSubject!.height = newHeight
            mouse.currentSubject!.x = newX
            mouse.currentSubject!.y = newY
          }
          break
        case 'top-right':
          newWidth = Math.max(minWidth, resizeStart.value.width + deltaX)
          newHeight = Math.max(minHeight, resizeStart.value.height - deltaY)
          newY = mouse.currentSubject!.y! + (mouse.currentSubject!.height! - newHeight)
          mouse.currentSubject!.width = newWidth
          if (newY >= 0) {
            mouse.currentSubject!.height = newHeight
            mouse.currentSubject!.y = newY
          }
          break
        case 'bottom-left':
          newWidth = Math.max(minWidth, resizeStart.value.width - deltaX)
          newX = mouse.currentSubject!.x! + (mouse.currentSubject!.width! - newWidth)
          newHeight = Math.max(minHeight, resizeStart.value.height + deltaY)
          if (newX >= 0 && newX + newWidth <= container!.offsetWidth) {
            mouse.currentSubject!.width = newWidth
            mouse.currentSubject!.x = newX
          }
          if (mouse.currentSubject!.y! + newHeight <= totalHeight)
            mouse.currentSubject!.height = newHeight

          break
        case 'bottom-right':
          newWidth = Math.max(minWidth, resizeStart.value.width + deltaX)
          newHeight = Math.max(minHeight, resizeStart.value.height + deltaY)
          if (mouse.currentSubject!.x! + newWidth <= container!.offsetWidth)
            mouse.currentSubject!.width = newWidth

          if (mouse.currentSubject!.y! + newHeight <= totalHeight)
            mouse.currentSubject!.height = newHeight

          break
        case 'left':
          newWidth = Math.max(minWidth, resizeStart.value.width - deltaX)
          newX = mouse.currentSubject!.x! + (mouse.currentSubject!.width! - newWidth)
          if (newX >= 0) {
            mouse.currentSubject!.width = newWidth
            mouse.currentSubject!.x = newX
          }
          break
        case 'right':
          newWidth = Math.max(minWidth, resizeStart.value.width + deltaX)
          mouse.currentSubject!.width = newWidth
          break
        case 'top':
          newHeight = Math.max(minHeight, resizeStart.value.height - deltaY)
          newY = mouse.currentSubject!.y! + (mouse.currentSubject!.height! - newHeight)
          if (newY >= 0) {
            mouse.currentSubject!.height = newHeight
            mouse.currentSubject!.y = newY
          }
          break
        case 'bottom':
          newHeight = Math.max(minHeight, resizeStart.value.height + deltaY)
          mouse.currentSubject!.height = newHeight
          break
      }

      if (mouse.currentSubject) {
        const hours: number | string = Math.floor(mouse.currentSubject.width! / 4.8 / 60)
        const minutes: number | string = Math.round(mouse.currentSubject.width! / 4.8 % 60)
        const duration = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:00`
        mouse.currentSubject.duration = duration

        // Calculate new groups
        const currentGroupIndex = mouse.currentSubject.y! / runtimeConfig.public.groupHeight
        const newGroupCount = mouse.currentSubject.height! / runtimeConfig.public.groupHeight
        mouse.currentSubject.groups = schedule.groups.slice(currentGroupIndex, currentGroupIndex + newGroupCount)
        mouse.currentSubject.groupsIds = mouse.currentSubject?.groups.map(group => group.id)

        calculateStartTime(mouse.currentSubject)
      }
    })
  }

  async function onResizeUp() {
    // Remove event listeners from window
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)

    mouse.isResizing = false

    if (mouse.isCreating) {
      mouse.isCreating = false

      const subject = await $fetch<Subject>('subjects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api/',
        body: JSON.stringify(mouse.currentSubject),
      })

      schedule.subjects[schedule.subjects.length - 1].id = subject.id
    }

    if (mouse.currentSubject && !mouse.isCreating) {
      mouse.currentSubject.ghost = false
      await subjectsStore.update(mouse.currentSubject)
    }

    mouse.currentSubject = null
    initialResizeEdge.value = null
  }

  return {
    onResizeDown,
    onResizeMove,
    onResizeUp,
  }
}
