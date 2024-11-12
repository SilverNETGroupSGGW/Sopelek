<script lang="ts" setup>
import { useCreator } from '~/stores/creator/useCreator'

const creator = useCreator()
</script>

<template>
  <div :style="{ position: 'relative' }">
    <creator-subject-card
      v-for="(subject, index) in creator.subjectsPositions"
      :key="index.toString() + subject.x + subject.y + subject.width + subject.height"
      :subject="subject"
      :z-index="1"
    />
  </div>
</template>
