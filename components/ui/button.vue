<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  color: { type: String, default: 'primary' }, // primary, secondary, accent, etc
  size: { type: String, default: 'md' }, // xs, sm, md, lg
  disabled: { type: Boolean, default: false }
})

const buttonClass = computed(() => [
  'btn',
  `btn-${props.color}`,
  `btn-${props.size}`,
  { 'btn-disabled': props.disabled }
])
</script>
