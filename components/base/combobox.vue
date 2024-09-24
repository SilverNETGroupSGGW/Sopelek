<script setup lang="ts">
import Multiselect from 'vue-multiselect'
// Documentation: https://vue-multiselect.js.org/

const props = defineProps<{
  placeholder?: string
  options: string[]
  onChange?: (value: string) => void
}>()

const value = ref(null)
</script>

<template>
  <div class="relative flex flex-col">
    <Multiselect
      v-model="value"
      :options="props.options"
      :placeholder="props.placeholder"
      :show-labels="false"
      @select="props.onChange"
    />
  </div>
</template>

<style>
 @import url('https://unpkg.com/vue-multiselect@3.1.0/dist/vue-multiselect.min.css');

.multiselect {
    width: 100%;
}

.multiselect__placeholder {
    margin-left: 1rem;
    font-size: 15px;
    color: #000;
}

.multiselect__input {
    margin-left: 1rem;
    color: #ef0f0f;
    font-size: 15px;
    padding: 0;
}

.multiselect__input:focus {
    margin-left: 1rem;
    color: #ef0f0f;
    padding: 0;
    border-width: 1px;
    border-radius: 0.5rem;
}

.multiselect__single {
    margin-left: 1rem;
    padding: 0;
}

.multiselect__option--highlight {
    background-color: rgb(79 70 229);
}

.multiselect__option--selected.multiselect__option--highlight {
    background-color: rgb(79 70 229);
}
</style>
