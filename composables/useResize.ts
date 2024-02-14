import type { DayOfWeek, Subject } from '~/types'

export default function useResize(container: HTMLElement, dayOfWeek: DayOfWeek) {
  const mouse = useMouse()
  const scheduler = useScheduler()
  const runtimeConfig = useRuntimeConfig()

  const rafId = ref<number | null>(null)
  const original = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
  })

  const baseDate = ref(new Date(1970, 0, 1, 8, 0, 0, 0))

  function onResizeDown(e: PointerEvent) {
    const { getResizeEdge } = usePointer(container, dayOfWeek)
    const runtimeConfig = useRuntimeConfig()

    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)
    mouse.isResizing = true

    original.value = {
      x: mouse.currentSubject.x!,
      y: mouse.currentSubject.y!,
      width: mouse.currentSubject.width!,
      height: mouse.currentSubject.height!,
      mouseX: e.clientX,
      mouseY: e.clientY,
    }

    if (!mouse.isCreating)
      mouse.resizeEdge = getResizeEdge(e, target.getBoundingClientRect(), runtimeConfig.public.edgeThreshold)
    else
      mouse.resizeEdge = 'se'

    window.addEventListener('pointermove', onResizeMove)
    window.addEventListener('pointerup', onResizeUp)
  }

  function onResizeMove(e: PointerEvent) {
    if (mouse.isResizing) {
      if (rafId.value)
        cancelAnimationFrame(rafId.value)

      rafId.value = requestAnimationFrame(() => {
        const deltaX = e.clientX - original.value.mouseX
        const deltaY = e.clientY - original.value.mouseY
        let newX: number, newY: number, newWidth: number, newHeight: number, snappedX: number, snappedY: number

        if (mouse.resizeEdge.includes('w')) {
          newX = original.value.x + deltaX
          newWidth = original.value.width - deltaX
          if (newWidth <= runtimeConfig.public.intervalWidth) {
            mouse.currentSubject.x! += mouse.currentSubject.width! - runtimeConfig.public.intervalWidth
            mouse.currentSubject.width! = runtimeConfig.public.intervalWidth
          }
          else {
            snappedX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
            newWidth = original.value.width + original.value.x - snappedX
            if (newWidth > 0 && newX >= 0) {
              mouse.currentSubject.x! = snappedX
              mouse.currentSubject.width! = newWidth
            }
          }
        }

        if (mouse.resizeEdge.includes('n')) {
          newY = original.value.y + deltaY
          newHeight = original.value.height - deltaY
          if (newHeight <= runtimeConfig.public.intervalHeight) {
            mouse.currentSubject.y! += mouse.currentSubject.height! - runtimeConfig.public.intervalHeight
            mouse.currentSubject.height! = runtimeConfig.public.intervalHeight
          }
          else {
            snappedY = Math.round(newY / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
            newHeight = original.value.height + original.value.y - snappedY
            if (newHeight > 0 && newY >= 0) {
              mouse.currentSubject.y! = snappedY
              mouse.currentSubject.height! = newHeight
            }
          }
        }

        if (mouse.resizeEdge.includes('e')) {
          newWidth = original.value.width + deltaX
          if (newWidth <= runtimeConfig.public.intervalWidth) {
            mouse.currentSubject.width! = runtimeConfig.public.intervalWidth
          }
          else {
            newWidth = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
            if (newWidth + mouse.currentSubject.x! <= container.offsetWidth)
              mouse.currentSubject.width! = newWidth
          }
        }

        if (mouse.resizeEdge.includes('s')) {
          newHeight = original.value.height + deltaY
          if (newHeight <= runtimeConfig.public.intervalHeight) {
            mouse.currentSubject.height! = runtimeConfig.public.intervalHeight
          }
          else {
            newHeight = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
            if (newHeight + mouse.currentSubject.y! <= container.offsetHeight)
              mouse.currentSubject.height! = newHeight
          }
        }

        // Recalculate the lesson's start time
        baseDate.value = new Date(1970, 0, 1, 8, 0, 0, 0)
        baseDate.value.setMinutes(baseDate.value.getMinutes() + (mouse.currentSubject.x! / runtimeConfig.public.intervalWidth) * 5)
        mouse.currentSubject.startTime = baseDate.value.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        // Recalculate duration
        baseDate.value = new Date(1970, 0, 1, 0, 0, 0, 0)
        baseDate.value.setMinutes(baseDate.value.getMinutes() + (mouse.currentSubject.width! / runtimeConfig.public.intervalWidth) * 5)
        mouse.currentSubject.duration = baseDate.value.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        // Recalculate groups
        const currentGroupIndex = mouse.currentSubject.y! / runtimeConfig.public.intervalHeight
        const newGroupCount = mouse.currentSubject.height! / runtimeConfig.public.intervalHeight
        mouse.currentSubject.groups = scheduler.schedule!.groups.slice(currentGroupIndex, currentGroupIndex + newGroupCount)!
        mouse.currentSubject.groupsIds = mouse.currentSubject?.groups!.map(group => group.id)
      })
    }
  }

  async function onResizeUp(e: PointerEvent) {
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)

    if (!mouse.isResizing)
      return

    const target = e.target as HTMLElement
    target.releasePointerCapture(e.pointerId)
    mouse.isResizing = false

    const subject = await $fetch<Subject>('subjects', {
      method: mouse.currentSubject.id === '' ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${useCookie('accessToken').value}`,
      },
      baseURL: runtimeConfig.public.baseURL,
      body: JSON.stringify(mouse.currentSubject),
    })

    if (subject) {
      if (mouse.currentSubject.id === '') {
        mouse.currentSubject.ghost = false
        mouse.currentSubject.id = subject.id
      }
    }

    baseDate.value = new Date(1970, 0, 1, 8, 0, 0, 0)
    mouse.currentSubject = {} as Subject
  }

  return {
    onResizeDown,
  }
}
