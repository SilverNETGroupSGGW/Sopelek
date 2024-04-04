<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'

defineProps<{
  icon: /* FunctionalComponent */ any
  right?: boolean
  title: string
  fullSize?: boolean
}>()

const model = defineModel<boolean>()
</script>

<template>
  <DialogRoot :open="model" @update:open="model = $event">
    <DialogTrigger>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-black/25" />

      <DialogContent class="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white text-left align-middle shadow-xl" :class="fullSize ? 'h-full w-7/12' : 'w-[32rem] h-auto max-h-[36rem]'">
        <div class="flex items-center justify-between rounded-t-lg border border-b-gray-200 bg-gray-50 p-6">
          <div class="flex items-center gap-4 text-gray-900">
            <component :is="icon" class="size-5" />
            <DialogTitle as="h3" class="text-lg font-medium">
              {{ title }}
            </DialogTitle>
          </div>

          <DialogClose aria-label="Close">
            <XMarkIcon class="size-6 cursor-pointer text-gray-400" @click="model = false" />
          </DialogClose>
        </div>

        <div class="overflow-auto rounded-b-lg p-6" :class="[fullSize ? 'h-full' : '']">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
