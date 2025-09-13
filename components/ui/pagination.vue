<template>
  <div class="flex justify-center items-center gap-2 mt-4">
    <button class="btn btn-sm" :disabled="currentPage <= 1" @click="$emit('change', currentPage - 1)">&laquo; Prev</button>
    <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
    <button class="btn btn-sm" :disabled="currentPage >= totalPages" @click="$emit('change', currentPage + 1)">Next &raquo;</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['change'])
</script>
