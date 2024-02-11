<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
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
  <TransitionRoot appear :show="model" as="template">
    <Dialog as="div" class="relative z-[9999]" @close="model = false">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div class="flex min-h-screen items-center p-4 text-center" :class="[right ? 'justify-end' : 'justify-center']">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="max-h-screen w-full rounded-lg bg-white text-left align-middle shadow-xl transition-all" :class="fullSize ? 'w-7/12' : 'max-w-[32rem]'">
              <div class="flex items-center justify-between rounded-t-lg border border-b-gray-200 bg-gray-50 p-6">
                <div class="flex items-center gap-4 text-gray-900">
                  <component :is="icon" class="size-5" />
                  <DialogTitle as="h3" class="text-lg font-medium">
                    {{ title }}
                  </DialogTitle>
                </div>
                <XMarkIcon class="size-6 cursor-pointer text-gray-400" @click="model = false" />
              </div>

              <div class="overflow-y-scroll p-6" :class="[fullSize ? 'h-screen' : 'max-h-[32rem]']">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
