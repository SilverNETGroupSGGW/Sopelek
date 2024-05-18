<script setup lang="ts">
import { Popover, PopoverButton, PopoverOverlay, PopoverPanel } from '@headlessui/vue'
import { IconDots } from '@tabler/icons-vue'
</script>

<template>
  <Popover class="relative">
    <PopoverButton class="bg-indigo-600 hover:bg-indigo-300 px-2 py-2 rounded-md">
      <IconDots size="15" color="white" />
    </PopoverButton>

    <PopoverOverlay class="fixed inset-0 bg-black opacity-30" />
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 bg-white shadow-lg border border-gray-200">
        <slot />
      </PopoverPanel>
    </transition>
  </Popover>
</template>
