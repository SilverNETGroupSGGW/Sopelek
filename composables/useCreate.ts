import type { DayOfWeek, Subject } from '~/types'

export default function useCreate(container: HTMLElement, dayOfWeek: DayOfWeek) {
  const mouse = useMouse()
  const runtimeConfig = useRuntimeConfig()
  const scheduler = useScheduler()

  const baseTime = ref(new Date(1970, 0, 0, 8, 0, 0))

  const { onResizeDown } = useResize(container, dayOfWeek)
  const { calculatePosition } = useSubject()

  function onCreateDown(e: PointerEvent) {
    if ((e.target as HTMLElement) instanceof HTMLButtonElement)
      return

    mouse.isCreating = true

    const offsetX = e.clientX - container.getBoundingClientRect().left
    const offsetY = e.clientY - container.getBoundingClientRect().top

    baseTime.value.setHours(8, 0, 0, 0)
    baseTime.value.setMinutes(baseTime.value.getMinutes() + Math.floor(offsetX / 24) * 5)

    let subject: Subject = {
      dayOfWeek,
      duration: '00:05:00',
      ghost: true,
      groups: scheduler.schedule!.groups.slice(Math.floor(offsetY / runtimeConfig.public.intervalHeight), Math.floor(offsetY / runtimeConfig.public.intervalHeight) + 1),
      height: runtimeConfig.public.intervalHeight,
      id: '',
      name: 'Zajęcia',
      scheduleId: scheduler.schedule!.id,
      startTime: baseTime.value.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      width: runtimeConfig.public.intervalWidth,
    }

    subject = {
      ...subject,
      ...calculatePosition(subject, scheduler.schedule!.groups.map(x => x.name)),
    }

    scheduler.schedule!.subjects.push(subject)
    mouse.currentLesson = scheduler.schedule!.subjects.at(-1) as Subject

    onResizeDown(e)
  }

  return {
    onCreateDown,
  }
}
