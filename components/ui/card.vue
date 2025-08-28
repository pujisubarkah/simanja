<template>
  <div :class="cardClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  color: { type: String, default: 'base-100' }, // DaisyUI color
  bordered: { type: Boolean, default: true },
  shadow: { type: Boolean, default: true }
})

const cardClass = computed(() => [
  'card',
  `bg-${props.color}`,
  { 'card-bordered': props.bordered },
  { 'shadow-xl': props.shadow }
])
</script>
