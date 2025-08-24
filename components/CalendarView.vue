<!-- /components/CalendarView.vue -->
<template>
  <div class="bg-white rounded-xl shadow p-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">📅 Kalender Progres Tim</h3>

    <!-- Header Hari -->
    <div class="grid grid-cols-7 gap-1 text-center mb-2">
      <div v-for="day in ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']" :key="day" 
           class="font-semibold text-gray-700 text-sm py-2">
        {{ day }}
      </div>
    </div>

    <!-- Grid Tanggal -->
    <div class="grid grid-cols-7 gap-1">
      <div v-for="date in dateGrid" :key="date.date" 
           class="min-h-20 p-1 border border-gray-200 bg-white text-xs relative hover:bg-blue-50 transition">
        
        <!-- Tanggal -->
        <div :class="[
          'w-6 h-6 flex items-center justify-center rounded-full mb-1',
          isToday(date.date) ? 'bg-blue-600 text-white' : 'text-gray-700'
        ]">
          {{ date.day }}
        </div>

        <!-- Event (Tugas) -->
        <div v-for="event in date.events" :key="event.id" 
             class="text-[10px] p-1 rounded text-white truncate mb-1 leading-tight"
             :class="event.status === 'completed' ? 'bg-green-500' : 
                    event.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'"
             :title="event.task">
          {{ event.task }}
        </div>

        <!-- Tidak ada tugas -->
        <div v-if="date.events.length === 0" class="text-gray-300 text-center text-[10px]">–</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Array,
    required: true
  }
})

// Generate 35 hari (5 minggu)
const generateDateGrid = () => {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay()) // Minggu awal

  const grid = []
  for (let i = 0; i < 35; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    
    const dateStr = d.toISOString().split('T')[0]
    const events = props.progress.filter(p => p.date === dateStr)

    grid.push({
      date: d,
      day: d.getDate(),
      events
    })
  }
  return grid
}

const dateGrid = computed(() => generateDateGrid())

const isToday = (date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}
</script>