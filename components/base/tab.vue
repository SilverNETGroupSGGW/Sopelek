<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue'

defineProps<{
  active?: boolean
  label: string
  icon: any
  to: string
}>()
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <TooltipRoot>
      <TooltipTrigger>
        <NuxtLink :to="to" class="-mx-3 flex size-12 items-center justify-center gap-3 rounded-full font-medium text-indigo-100 transition-colors duration-200 ease-in-out hover:bg-indigo-500" :class="[active ? 'bg-indigo-400' : 'bg-indigo-600']">
          <component :is="icon" class="size-5 stroke-2" />
        </NuxtLink>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent class="text-gray-700 select-none rounded-lg bg-white px-4 py-3 border" :side-offset="24" side="right">
          {{ label }}
          <TooltipArrow class="fill-white" :width="8" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
