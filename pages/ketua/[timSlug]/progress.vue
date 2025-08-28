<!-- /pages/ketua-tim/[timSlug]/progress.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
    <div class="max-w-5xl mx-auto flex flex-col gap-8">
      <!-- Header & Filter -->
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-2">
        <div class="flex flex-col gap-1">
          <h1 class="text-3xl font-extrabold text-blue-900 tracking-tight">📈 Progres Tim {{ timSlug }}</h1>
          <p class="text-gray-600 text-base">Pantau capaian tugas harian anggota tim.</p>
        </div>
        <div class="flex items-center gap-2 mt-2 md:mt-0">
          <label class="block text-sm font-medium text-gray-700">Periode</label>
          <select v-model="filterDate" class="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-200">
            <option value="today">Hari Ini</option>
            <option value="this-week">Minggu Ini</option>
            <option value="last-7-days">7 Hari Terakhir</option>
            <option value="all">Semua</option>
          </select>
        </div>
      </div>

      <!-- Ringkasan Cepat -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        <div class="bg-gradient-to-br from-green-50 via-white to-green-100 p-5 rounded-xl text-center shadow-md border border-green-100 hover:shadow-lg transition flex flex-col items-center justify-center">
          <div class="text-3xl font-extrabold text-green-600">{{ completedCount }}</div>
          <div class="text-gray-600 text-sm font-semibold">Selesai</div>
        </div>
        <div class="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-5 rounded-xl text-center shadow-md border border-yellow-100 hover:shadow-lg transition flex flex-col items-center justify-center">
          <div class="text-3xl font-extrabold text-yellow-600">{{ inProgressCount }}</div>
          <div class="text-gray-600 text-sm font-semibold">Proses</div>
        </div>
        <div class="bg-gradient-to-br from-red-50 via-white to-red-100 p-5 rounded-xl text-center shadow-md border border-red-100 hover:shadow-lg transition flex flex-col items-center justify-center">
          <div class="text-3xl font-extrabold text-red-600">{{ lateCount }}</div>
          <div class="text-gray-600 text-sm font-semibold">Terlambat</div>
        </div>
        <div class="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-5 rounded-xl text-center shadow-md border border-blue-100 hover:shadow-lg transition flex flex-col items-center justify-center">
          <div class="text-3xl font-extrabold text-blue-600">{{ totalCount }}</div>
          <div class="text-gray-600 text-sm font-semibold">Total Tugas</div>
        </div>
      </div>

      <!-- Chart Progres Mingguan -->
      <div class="bg-white p-6 rounded-xl shadow mb-6">
        <h3 class="font-semibold text-gray-800 mb-4">📊 Progres Mingguan Tim</h3>
        <div class="h-48 flex items-center justify-center text-gray-500 bg-gray-50 rounded">
          <!-- Nanti pakai Chart.js -->
          <WeeklyProgressChart :data="weeklyData" />
        </div>
      </div>

      <!-- Tab Timeline/Kalender -->
      <div class="flex border-b mb-6">
        <button 
          :class="['px-4 py-2 font-medium', activeTab === 'timeline' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500']"
          @click="activeTab = 'timeline'"
        >
          Timeline
        </button>
        <button 
          :class="['px-4 py-2 font-medium', activeTab === 'calendar' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500']"
          @click="activeTab = 'calendar'"
        >
          Kalender
        </button>
      </div>

      <!-- Konten Tab -->
      <template v-if="activeTab === 'timeline'">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-2">
          <div class="p-6 border-b bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-between">
            <h2 class="font-bold text-gray-800 text-lg">Aktivitas Terbaru</h2>
            <span class="text-sm text-gray-500">Total: {{ totalCount }}</span>
          </div>
          <div v-if="filteredProgress.length > 0" class="divide-y divide-gray-100">
            <div 
              v-for="p in filteredProgress" 
              :key="p.id" 
              class="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-200 relative border-l-4 rounded-xl group flex flex-col gap-2"
              :class="borderColor(p.status)"
            >
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex-1 flex flex-col gap-1">
                  <div class="font-semibold text-gray-800 group-hover:text-blue-700 transition text-lg">{{ p.task }}</div>
                  <div class="text-sm text-gray-600">
                    Oleh: <span class="font-medium">{{ p.nama }}</span> • {{ formatDate(p.date) }}
                  </div>
                  <div class="text-sm mt-1">
                    <span :class="statusBadge(p.status)">{{ statusText(p.status) }}</span>
                  </div>
                </div>
                <div class="flex gap-2 min-w-fit items-center">
                  <button 
                    @click="openDetail(p)"
                    class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
              <div v-if="p.progress !== undefined" class="mt-2">
                <div class="text-xs text-gray-500 mb-1">Progres: {{ p.progress }}%</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-500" 
                    :class="progressColor(p.progress)"
                    :style="{ width: p.progress + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-12 text-center text-gray-400">
            <div class="text-5xl mb-4">📊</div>
            <div class="text-lg font-semibold mb-2">Tidak ada aktivitas</div>
            <div>Belum ada progres yang dilaporkan untuk periode ini.</div>
          </div>
        </div>
      </template>
      <template v-else>
        <CalendarView :progress="filteredProgress" />
      </template>
    </div>

    <!-- Modal Detail -->
    <div v-if="selectedProgress" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 animate-fadein">
      <div class="bg-white rounded-3xl shadow-2xl border-4 border-blue-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-grow">
        <div class="p-6 border-b bg-gradient-to-r from-blue-50 to-green-50 rounded-t-2xl flex justify-between items-center">
          <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">📋 Detail Progres</h3>
          <button @click="selectedProgress = null" class="text-2xl font-bold text-gray-400 hover:text-red-500 transition">&times;</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4 mb-2">
            <div><strong>Tugas:</strong> <span class="text-blue-700">{{ selectedProgress.task }}</span></div>
            <div><strong>Pegawai:</strong> <span class="text-green-700">{{ selectedProgress.nama }}</span></div>
            <div><strong>Tanggal:</strong> <span class="text-gray-700">{{ formatDate(selectedProgress.date) }}</span></div>
            <div><strong>Status:</strong> <span :class="statusBadge(selectedProgress.status)">{{ statusText(selectedProgress.status) }}</span></div>
          </div>
          <div class="border-t pt-4">
            <h4 class="font-semibold mb-2 text-gray-800">Deskripsi:</h4>
            <p class="bg-gray-100 p-3 rounded-lg text-gray-700 whitespace-pre-wrap">{{ selectedProgress.description }}</p>
          </div>
          <div v-if="selectedProgress.progress !== undefined" class="pt-4">
            <strong>Progres:</strong>
            <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div 
                class="h-3 rounded-full transition-all duration-500" 
                :class="progressColor(selectedProgress.progress)"
                :style="{ width: selectedProgress.progress + '%' }"
              ></div>
            </div>
            <div class="text-right text-sm text-gray-600 mt-1">{{ selectedProgress.progress }}%</div>
          </div>
          <!-- Di dalam modal detail -->
          <div class="p-4 bg-gray-50 rounded-lg mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">💬 Komentar Ketua</label>
            <textarea 
              v-model="selectedProgress.feedback" 
              rows="3" 
              class="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Tambahkan apresiasi atau saran..."
            ></textarea>
            <button 
              @click="saveFeedback" 
              class="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Simpan Komentar
            </button>
          </div>
        </div>
        <div class="p-6 border-t flex justify-end bg-gradient-to-r from-blue-50 to-green-50 rounded-b-2xl">
          <button @click="selectedProgress = null" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeeklyProgressChart from '~/components/WeeklyProgressChart.vue'
const weeklyData = ref([
  { day: 'Sen', value: 80 },
  { day: 'Sel', value: 60 },
  { day: 'Rab', value: 70 },
  { day: 'Kam', value: 90 },
  { day: 'Jum', value: 85 },
  { day: 'Sab', value: 50 },
  { day: 'Min', value: 40 }
])
import { useProgress } from '~/composables/useProgress'
import CalendarView from '~/components/CalendarView.vue'
const activeTab = ref('timeline')
definePageMeta({ layout: 'default' })
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const timSlug = route.params.timSlug

const { progressList, loading, loadProgress, addFeedback } = useProgress(timSlug)

import { onMounted } from 'vue'
onMounted(() => {
  loadProgress()
})

// State
const filterDate = ref('today')
const selectedProgress = ref(null)

// Computed: Filter berdasarkan periode
const filteredProgress = computed(() => {
  const today = new Date()
  const oneDay = 24 * 60 * 60 * 1000

  return progressList.value.filter(p => {
    const pDate = new Date(p.date)
    const diffDays = Math.round(Math.abs((today - pDate) / oneDay))

    switch (filterDate.value) {
      case 'today':
        return diffDays === 0
      case 'this-week':
        return diffDays <= 7 && pDate <= today
      case 'last-7-days':
        return diffDays <= 7
      case 'all':
        return true
      default:
        return true
    }
  })
})

// Ringkasan
const totalCount = computed(() => filteredProgress.value.length)
const completedCount = computed(() => filteredProgress.value.filter(p => p.status === 'completed').length)
const inProgressCount = computed(() => filteredProgress.value.filter(p => p.status === 'in-progress').length)
const lateCount = computed(() => filteredProgress.value.filter(p => p.status === 'late').length)

// Helper
const formatDate = (dateStr) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return new Date(dateStr).toLocaleDateString('id-ID', options)
}

const statusText = (status) => {
  const labels = {
    completed: 'Selesai',
    'in-progress': 'Dalam Proses',
    late: 'Terlambat'
  }
  return labels[status] || status
}

const statusBadge = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium',
    'in-progress': 'bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium',
    late: 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium'
  }
  return classes[status]
}

const borderColor = (status) => {
  return status === 'completed' ? 'border-green-500' : 
         status === 'in-progress' ? 'border-yellow-500' : 'border-red-500'
}

const progressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

// Aksi
const openDetail = (p) => {
  selectedProgress.value = p
}

const saveFeedback = () => {
  addFeedback(selectedProgress.value)
  alert(`Komentar untuk ${selectedProgress.value.nama} berhasil disimpan!`)
}
</script>

<style scoped>
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadein {
  animation: fadein 0.3s;
}
@keyframes grow {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
.animate-grow {
  animation: grow 0.3s;
}
</style>