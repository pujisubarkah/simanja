<template>
  <div v-if="show" class="modal modal-open">
    <div class="modal-box">
      <button class="btn btn-sm btn-circle absolute right-2 top-2" @click="$emit('close')">✕</button>
      <h3 v-if="title" class="font-bold text-lg mb-2">{{ title }}</h3>
      <slot />
    </div>
    <div class="modal-backdrop" @click="$emit('close')"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' }
})
</script>
