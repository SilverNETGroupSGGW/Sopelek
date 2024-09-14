<script setup>
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

const apiUrl = config.public.baseURL
</script>

<template>
  <div>
    <h1>Environment Variables</h1>
    <ul>
      <li>API_URL: {{ apiUrl }}</li>
    </ul>
  </div>
</template>
