<!-- /components/WeeklyProgressChart.vue -->
<script setup>
const props = defineProps(['data'])

// Dummy data: hari ini sampai 6 hari ke belakang
const labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const avgProgress = labels.map(() => Math.floor(Math.random() * 40) + 60) // 60-100%
</script>

<template>
  <div class="w-full h-full flex items-center justify-around px-2 text-sm">
    <div v-for="(p, i) in avgProgress" :key="i" class="flex flex-col items-center">
      <div class="text-xs text-gray-600">{{ labels[i] }}</div>
      <div 
        class="w-8 bg-blue-500 rounded-t"
        :style="{ height: p + 'px' }"
      ></div>
      <div class="text-xs mt-1">{{ p }}%</div>
    </div>
  </div>
</template>