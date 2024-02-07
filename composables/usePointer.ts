export default function usePointer() {
  const runtimeConfig = useRuntimeConfig()

  function isOutside(e: PointerEvent) {
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()

    return (
      e.clientX < rect.left + runtimeConfig.public.edgeThreshold
      || e.clientX > rect.right - runtimeConfig.public.edgeThreshold
      || e.clientY < rect.top + runtimeConfig.public.edgeThreshold
      || e.clientY > rect.bottom - runtimeConfig.public.edgeThreshold
    )
  }

  return {
    isOutside,
  }
}
