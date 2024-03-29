import { computed, ref } from 'vue'
import type { BaseResponse, Subject } from '~/types'

export default function useDrag(container: HTMLElement) {
  const mouse = useMouse()
  const scheduler = useScheduler()
  const runtimeConfig = useRuntimeConfig()

  const rafId = ref<number | null>(null)
  const containerRect = container.getBoundingClientRect()

  const offsetX = ref(0)
  const offsetY = ref(0)

  const baseDate = ref(new Date(1970, 0, 1, 8, 0, 0, 0))
  const minutes = computed(() => (mouse.currentSubject.x! / 24) * 5)

  function onDragDown(e: PointerEvent) {
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    mouse.isDragging = true

    offsetX.value = e.clientX - mouse.currentSubject.x!
    offsetY.value = e.clientY - mouse.currentSubject.y!

    window.addEventListener('pointermove', onDragMove)
    window.addEventListener('pointerup', onDragUp)
  }

  function onDragMove(e: PointerEvent) {
    if (mouse.isDragging) {
      if (rafId.value)
        cancelAnimationFrame(rafId.value)

      rafId.value = requestAnimationFrame(() => {
        let newX = e.clientX - offsetX.value
        let newY = e.clientY - offsetY.value

        newX = Math.round(newX / runtimeConfig.public.intervalWidth) * runtimeConfig.public.intervalWidth
        newY = Math.round(newY / runtimeConfig.public.intervalHeight) * runtimeConfig.public.intervalHeight

        const elementRect = (e.target as HTMLElement).getBoundingClientRect()

        if (newX < 0)
          newX = 0
        else if (newX > containerRect.width - elementRect.width)
          newX = containerRect.width - elementRect.width

        if (newY < 0)
          newY = 0
        else if (newY > containerRect.height - elementRect.height)
          newY = containerRect.height - elementRect.height

        mouse.currentSubject.x = newX
        mouse.currentSubject.y = newY

        baseDate.value.setHours(8)
        baseDate.value.setMinutes(minutes.value)

        mouse.currentSubject.startTime = baseDate.value.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        const currentGroupIndex = mouse.currentSubject.y! / runtimeConfig.public.intervalHeight
        const newGroupCount = mouse.currentSubject.height! / runtimeConfig.public.intervalHeight
        mouse.currentSubject.groups = scheduler.schedule!.groups.slice(currentGroupIndex, currentGroupIndex + newGroupCount)!
        mouse.currentSubject.groupsIds = mouse.currentSubject?.groups!.map(group => group.id)
      })
    }
  }

  async function onDragUp(e: PointerEvent) {
    window.removeEventListener('pointermove', onDragMove)
    window.removeEventListener('pointerup', onDragUp)

    if (!mouse.isDragging)
      return

    const target = e.target as HTMLElement
    target.releasePointerCapture(e.pointerId)
    mouse.isDragging = false

    await $fetch<BaseResponse<Subject>>('subjects', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${useCookie('accessToken').value}`,
      },
      baseURL: runtimeConfig.public.baseURL,
      body: JSON.stringify(mouse.currentSubject),
    })

    mouse.currentSubject = {} as Subject
    mouse.resizeEdge = ''
    baseDate.value = new Date(1970, 0, 1, 8, 0, 0, 0)
  }

  return {
    onDragDown,
    onDragUp,
    onDragMove,
  }
}
