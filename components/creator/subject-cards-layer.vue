<script lang="ts" setup>
import { useCreator } from '~/stores/creator/useCreator'

const creator = useCreator()
</script>

<template>
  <div :style="{ position: 'relative' }">
    <creator-subject-card
      v-for="(subjectPosition, index) in creator.subjectsPositions"
      :key="index.toString() + subjectPosition.x + subjectPosition.y + subjectPosition.width + subjectPosition.height"
      :x="subjectPosition.x"
      :y="subjectPosition.y"
      :width="subjectPosition.width"
      :height="subjectPosition.height"
      :z-index="1"
    />
  </div>
</template>
