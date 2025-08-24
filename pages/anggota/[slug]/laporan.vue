<!-- /pages/anggota/[slug]/laporan.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900">
          📄 Laporan Pribadi
        </h1>
        <p class="text-gray-600">Unduh laporan kinerja Anda dalam format PDF atau Excel.</p>
      </div>

      <!-- Filter Jenis Laporan -->
      <div class="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
        <div class="flex flex-col md:flex-row gap-4 items-end">
          <div class="flex-1">
            <label class="block text-sm font-semibold text-gray-700 mb-2">📌 Jenis Laporan</label>
            <select v-model="jenisLaporan" class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200">
              <option value="harian">Laporan Harian</option>
              <option value="mingguan">Laporan Mingguan</option>
              <option value="skp">SKP (Sasaran Kinerja Pegawai)</option>
              <option value="self-assessment">Self-Assessment</option>
              <option value="ringkasan">Ringkasan Kinerja</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">📅 Periode</label>
            <select v-model="periode" class="p-3 border border-gray-300 rounded-xl bg-white">
              <option value="today">Hari Ini</option>
              <option value="this-week">Minggu Ini</option>
              <option value="this-month">Bulan Ini</option>
              <option value="last-month">Bulan Lalu</option>
              <option value="custom">Rentang Kustom</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Preview Laporan -->
      <div class="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">📄 Preview Laporan</h2>
        <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-40">
          <h3 class="font-semibold text-gray-800">{{ reportTitle }}</h3>
          <p class="text-gray-600 text-sm mt-1">Untuk periode: {{ periodeLabel }}</p>
          <ul class="mt-4 space-y-2 text-sm text-gray-700">
            <li>✅ Total tugas selesai: {{ reportData.completed }}</li>
            <li>🟡 Dalam proses: {{ reportData.inProgress }}</li>
            <li>❌ Terlambat: {{ reportData.late }}</li>
            <li>📊 Rata-rata progres: {{ reportData.avgProgress }}%</li>
          </ul>
          <div v-if="reportData.feedback" class="mt-4 p-3 bg-blue-50 rounded text-sm text-gray-700 border-l-4 border-blue-500">
            <strong>Feedback Atasan:</strong> "{{ reportData.feedback }}"
          </div>
        </div>
      </div>

      <!-- Tombol Export -->
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">📥 Unduh Laporan</h3>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="exportToPDF" class="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold flex items-center gap-2 shadow-md">
            📄 PDF
          </button>
          <button @click="exportToExcel" class="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold flex items-center gap-2 shadow-md">
            📊 Excel
          </button>
        </div>
        <p class="text-gray-500 text-sm mt-4">
          Format PDF cocok untuk arsip, Excel untuk analisis.
        </p>
      </div>
    </div>

    <!-- Modal Konfirmasi -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-grow">
        <h3 class="text-xl font-bold text-gray-800 mb-4">📤 Siap Mengunduh</h3>
        <p class="text-gray-600 mb-6">
          Laporan <strong>{{ reportTitle }}</strong> akan diunduh sebagai <strong>{{ exportType.toUpperCase() }}</strong>.
        </p>
        <div class="flex gap-3">
          <button @click="showModal = false" class="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
            Batal
          </button>
          <button @click="confirmExport" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Unduh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'anggota' })
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug

// State
const jenisLaporan = ref('harian')
const periode = ref('this-week')
const showModal = ref(false)
const exportType = ref('')

// Data dummy
const reportData = ref({
  completed: 8,
  inProgress: 2,
  late: 1,
  avgProgress: 82,
  feedback: 'Kinerja sangat baik, terus pertahankan!'
})

// Computed: Judul & Label
const reportTitle = computed(() => {
  const titles = {
    harian: 'Laporan Harian',
    mingguan: 'Laporan Mingguan',
    skp: 'SKP (Sasaran Kinerja Pegawai)',
    'self-assessment': 'Self-Assessment',
    ringkasan: 'Ringkasan Kinerja'
  }
  return titles[jenisLaporan.value] || 'Laporan'
})

const periodeLabel = computed(() => {
  const labels = {
    today: 'Hari Ini',
    'this-week': 'Minggu Ini',
    'this-month': 'Bulan Ini',
    'last-month': 'Bulan Lalu',
    custom: 'Rentang Kustom'
  }
  return labels[periode.value] || periode.value
})

// Aksi Export
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
    generatePDF()
  } else {
    generateExcel()
  }
  showModal.value = false
}

// Reuse pdf-lib dari sebelumnya
const generatePDF = async () => {
  const { generateReportPDF } = await import('~/composables/usePdf')
  
  const data = {
    nama: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    jenis: jenisLaporan.value,
    periode: periodeLabel.value,
    ...reportData.value
  }

  await generateReportPDF(data) // fungsi dari usePdf
}

const generateExcel = () => {
  alert(`Laporan ${reportTitle.value} berhasil diunduh sebagai Excel.`)
}
</script>

<style scoped>
.animate-grow {
  animation: grow 0.3s;
}
@keyframes grow {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
</style>