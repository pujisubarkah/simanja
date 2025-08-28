<!-- /pages/ketua-tim/[timSlug]/laporan.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-600">
          📄 Laporan Kinerja Tim {{ timSlug }}
        </h1>
        <p class="text-gray-600 mt-2">Ringkasan capaian, progres, dan evaluasi tim.</p>
      </div>

      <!-- Filter Periode -->
      <div class="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
        <div class="flex flex-col md:flex-row gap-4 items-end">
          <div class="flex-1">
            <label class="block text-sm font-semibold text-gray-700 mb-2">📅 Periode Laporan</label>
            <select v-model="selectedPeriod" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200">
              <option value="this-week">Minggu Ini</option>
              <option value="last-week">Minggu Lalu</option>
              <option value="this-month">Bulan Ini</option>
              <option value="last-month">Bulan Lalu</option>
              <option value="custom">Rentang Kustom</option>
            </select>
          </div>
          <button @click="generateReport" class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold flex items-center gap-2 shadow-md">
            🔍 Tampilkan Laporan
          </button>
        </div>
      </div>

      <!-- Ringkasan Laporan -->
      <div v-if="reportGenerated" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-8">
        <div class="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-b">
          <h2 class="text-xl font-bold text-gray-800">📊 Ringkasan Kinerja Tim</h2>
        </div>
        <div class="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ reportData.totalTasks }}</div>
            <div class="text-gray-500 text-sm">Total Tugas</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ reportData.completed }}</div>
            <div class="text-gray-500 text-sm">Selesai</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-yellow-600">{{ reportData.inProgress }}</div>
            <div class="text-gray-500 text-sm">Dalam Proses</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">{{ reportData.late }}</div>
            <div class="text-gray-500 text-sm">Terlambat</div>
          </div>
        </div>

        <!-- Grafik Progres -->
        <div class="p-6 border-t bg-gray-50">
          <h3 class="font-semibold text-gray-800 mb-4">📈 Progres Mingguan</h3>
          <WeeklyProgressChart :data="weeklyChartData" />
        </div>
      </div>

      <!-- Tombol Export -->
      <div v-if="reportGenerated" class="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">📥 Unduh Laporan</h3>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="exportToPDF" class="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold flex items-center gap-2">
            📄 PDF
          </button>
          <button @click="exportToExcel" class="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold flex items-center gap-2">
            📊 Excel
          </button>
        </div>
        <p class="text-gray-500 text-sm mt-4">
          Laporan mencakup: ringkasan, daftar tugas, dan tren kinerja.
        </p>
      </div>

      <!-- Belum Generate -->
      <div v-else class="bg-white p-12 rounded-2xl shadow text-center text-gray-500">
        <div class="text-6xl mb-4">📄</div>
        <div class="text-xl font-semibold mb-2">Laporan Belum Ditampilkan</div>
        <div>Pilih periode dan klik "Tampilkan Laporan" untuk melanjutkan.</div>
      </div>
    </div>

    <!-- Modal Export -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">📤 Ekspor Laporan</h3>
        <p class="text-gray-600 mb-6">Laporan untuk <strong>Tim {{ timSlug }}</strong> siap diunduh.</p>
        <div class="flex gap-3">
          <button @click="showModal = false" class="flex-1 px-4 py-2 bg-gray-200 rounded-lg">Batal</button>
          <button @click="confirmExport" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Unduh</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
import { generateReportPDF } from '~/composables/usePdf'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import WeeklyProgressChart from '~/components/WeeklyProgressChart.vue'

const route = useRoute()
const timSlug = route.params.timSlug

// State
const selectedPeriod = ref('this-week')
const reportGenerated = ref(false)
const showModal = ref(false)
const exportType = ref('')

// Data dummy laporan
const reportData = ref({
  totalTasks: 15,
  completed: 9,
  inProgress: 4,
  late: 2
})

// Data grafik
const weeklyChartData = ref([
  { day: 'Sen', value: 60 },
  { day: 'Sel', value: 70 },
  { day: 'Rab', value: 80 },
  { day: 'Kam', value: 75 },
  { day: 'Jum', value: 85 },
  { day: 'Sab', value: 60 },
  { day: 'Min', value: 50 }
])

// Computed: Persentase
const completionRate = computed(() => {
  return Math.round((reportData.value.completed / reportData.value.totalTasks) * 100) || 0
})

// Aksi
const generateReport = () => {
  console.log(`Generate laporan untuk: ${selectedPeriod.value}`)
  reportGenerated.value = true
}

const exportToPDF = () => {
  exportType.value = 'pdf'
  showModal.value = true
}

const exportToExcel = () => {
  exportType.value = 'excel'
  showModal.value = true
}

const confirmExport = () => {
  if (exportType.value === 'pdf') {
    const report = {
      tim: timSlug,
      period: selectedPeriod.value,
      totalTasks: reportData.value.totalTasks,
      completed: reportData.value.completed,
      inProgress: reportData.value.inProgress,
      late: reportData.value.late,
      weeklyData: weeklyChartData.value,
      tasks: filteredProgress?.value || [] // pastikan filteredProgress tersedia
    }
    generateReportPDF(report)
  } else {
    generateExcel()
  }
  showModal.value = false
}

// Dummy export
const generatePDF = async () => {
  // Reuse pdf-lib dari sebelumnya
  alert(`Laporan Tim ${timSlug} berhasil diunduh sebagai PDF.`)
}

const generateExcel = () => {
  alert(`Laporan Tim ${timSlug} berhasil diunduh sebagai Excel.`)
}
</script>

<style scoped>
/* Optional: animasi */
.animate-grow {
  animation: grow 0.3s;
}
@keyframes grow {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
</style>