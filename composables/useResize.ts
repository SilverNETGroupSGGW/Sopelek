import type { Subject } from '~/types'

export default async function useResize(container: HTMLElement) {
  const mouse = useMouse()
  const scheduler = useScheduler()
  const runtimeConfig = useRuntimeConfig()

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
    const { getResizeEdge } = usePointer(container)
    const runtimeConfig = useRuntimeConfig()

    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)
    mouse.isResizing = true

    original.value = {
      x: mouse.currentLesson.x!,
      y: mouse.currentLesson.y!,
      width: mouse.currentLesson.width!,
      height: mouse.currentLesson.height!,
      mouseX: e.clientX,
      mouseY: e.clientY,
    }

    const rect = target.getBoundingClientRect()
    const edgeThreshold = runtimeConfig.public.edgeThreshold

    mouse.resizeEdge = getResizeEdge(e, rect, edgeThreshold)

    window.addEventListener('pointermove', onResizeMove)
    window.addEventListener('pointerup', onResizeUp)
  }

  function onResizeMove(e: PointerEvent) {
    if (mouse.isResizing) {
      requestAnimationFrame(() => {
        const deltaX = e.clientX - original.value.mouseX
        const deltaY = e.clientY - original.value.mouseY
        let newX: number, newY: number, newWidth: number, newHeight: number, snappedX: number, snappedY: number

        if (mouse.resizeEdge.includes('w')) {
          newX = original.value.x + deltaX
          newWidth = original.value.width - deltaX
          if (newWidth <= runtimeConfig.public.intervalWidth) {
            mouse.currentLesson.x! += mouse.currentLesson.width! - runtimeConfig.public.intervalWidth
            mouse.currentLesson.width! = runtimeConfig.public.intervalWidth
          }
          else {
            snappedX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
            newWidth = original.value.width + original.value.x - snappedX
            if (newWidth > 0 && newX >= 0) {
              mouse.currentLesson.x! = snappedX
              mouse.currentLesson.width! = newWidth
            }
          }
        }

        if (mouse.resizeEdge.includes('n')) {
          newY = original.value.y + deltaY
          newHeight = original.value.height - deltaY
          if (newHeight <= runtimeConfig.public.intervalHeight) {
            mouse.currentLesson.y! += mouse.currentLesson.height! - runtimeConfig.public.intervalHeight
            mouse.currentLesson.height! = runtimeConfig.public.intervalHeight
          }
          else {
            snappedY = Math.round(newY / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
            newHeight = original.value.height + original.value.y - snappedY
            if (newHeight > 0 && newY >= 0) {
              mouse.currentLesson.y! = snappedY
              mouse.currentLesson.height! = newHeight
            }
          }
        }

        if (mouse.resizeEdge.includes('e')) {
          newWidth = original.value.width + deltaX
          if (newWidth <= runtimeConfig.public.intervalWidth) {
            mouse.currentLesson.width! = runtimeConfig.public.intervalWidth
          }
          else {
            newWidth = Math.round(newWidth / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
            if (newWidth + mouse.currentLesson.x! <= container.offsetWidth)
              mouse.currentLesson.width! = newWidth
          }
        }

        if (mouse.resizeEdge.includes('s')) {
          newHeight = original.value.height + deltaY
          if (newHeight <= runtimeConfig.public.intervalHeight) {
            mouse.currentLesson.height! = runtimeConfig.public.intervalHeight
          }
          else {
            newHeight = Math.round(newHeight / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight
            if (newHeight + mouse.currentLesson.y! <= container.offsetHeight)
              mouse.currentLesson.height! = newHeight
          }
        }

        // Recalculate the lesson's start time
        baseDate.value = new Date(1970, 0, 1, 8, 0, 0, 0)
        mouse.currentLesson.startTime = baseDate.value.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        // Recalculate duration
        baseDate.value = new Date(1970, 0, 1, 0, 0, 0, 0)
        baseDate.value.setMinutes(baseDate.value.getMinutes() + (mouse.currentLesson.width! / runtimeConfig.public.intervalWidth) * 5)
        mouse.currentLesson.duration = baseDate.value.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        // Recalculate groups
        const currentGroupIndex = mouse.currentLesson.y! / runtimeConfig.public.intervalHeight
        const newGroupCount = mouse.currentLesson.height! / runtimeConfig.public.intervalHeight
        mouse.currentLesson.groups = scheduler.schedule!.groups.slice(currentGroupIndex, currentGroupIndex + newGroupCount)!
        mouse.currentLesson.groupsIds = mouse.currentLesson?.groups!.map(group => group.id)
      })
    }
  }

  async function onResizeUp(e: PointerEvent) {
    window.removeEventListener('pointermove', onResizeMove)
    window.removeEventListener('pointerup', onResizeUp)

    {
      if (!mouse.isResizing)
        return

      const target = e.target as HTMLElement
      target.releasePointerCapture(e.pointerId)
      mouse.isResizing = false

      await $fetch<Subject>('subjects', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api/',
        body: JSON.stringify(mouse.currentLesson),
      })

      baseDate.value = new Date(1970, 0, 1, 8, 0, 0, 0)
      mouse.currentLesson = {} as Subject
    }

    return {
      onResizeDown,
    }
  }
}