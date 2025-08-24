<!-- /pages/pimpinan/laporan.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 mb-3 flex items-center justify-center gap-4">
        📄 Laporan Kinerja
      </h1>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        Akses laporan resmi organisasi untuk presentasi, evaluasi, atau arsip.
      </p>
    </div>

    <!-- Filter -->
    <div class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg mb-8 p-6">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-semibold text-gray-700 mb-2">🔍 Cari Laporan</label>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Judul, unit, atau kata kunci..." 
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Periode</label>
          <select v-model="filterPeriod" class="px-4 py-3 border border-gray-300 rounded-xl bg-white">
            <option value="">Semua Periode</option>
            <option>Q1 2025</option>
            <option>Q2 2025</option>
            <option>Bulanan - Maret 2025</option>
            <option>Tahunan 2024</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Jenis</label>
          <select v-model="filterType" class="px-4 py-3 border border-gray-300 rounded-xl bg-white">
            <option value="">Semua Jenis</option>
            <option value="bulanan">Bulanan</option>
            <option value="triwulan">Triwulan</option>
            <option value="tahunan">Tahunan</option>
            <option value="analisis">Analisis Kinerja</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Daftar Laporan -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="report in filteredReports" 
        :key="report.id" 
        class="card-report bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col"
      >
        <!-- Cover Mini -->
  <div class="bg-gray-100 text-gray-800 p-5 text-center relative flex flex-col items-center">
          <div class="text-5xl mb-2">📄</div>
          <h3 class="font-bold text-base leading-tight mb-1">{{ report.title }}</h3>
          <div class="text-xs opacity-90 mb-1">{{ report.period }}</div>
          <span class="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow bg-white/80 text-indigo-700 border border-indigo-200">
            {{ typeLabel(report.type) }}
          </span>
        </div>

        <!-- Detail -->
  <div class="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>🏢</span>
              <span>{{ report.unit }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>📅</span>
              <span>Dibuat: {{ report.date }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>📊</span>
              <span>Status: 
                <span class="font-bold px-2 py-1 rounded-full" :class="statusColor(report.status)">
                  {{ report.status === 'final' ? 'Final' : 'Draft' }}
                </span>
              </span>
            </div>
          </div>

          <!-- Aksi -->
          <div class="flex gap-2 pt-2">
            <button 
              @click="previewReport(report)" 
              class="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-semibold transition flex items-center justify-center gap-1 shadow"
            >
              👁️ Lihat
            </button>
            <button 
              @click="downloadReport(report, 'pdf')" 
              class="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-semibold transition flex items-center gap-1 shadow"
            >
              📄 PDF
            </button>
            <button 
              @click="downloadReport(report, 'excel')" 
              class="px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-semibold transition flex items-center gap-1 shadow"
            >
              📊 Excel
            </button>
          </div>
        </div>
      </div>

      <!-- Tidak Ada Laporan -->
      <div v-if="filteredReports.length === 0" class="col-span-full bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
        <div class="text-5xl mb-4">📄</div>
        <div class="text-xl font-semibold mb-2">Tidak ada laporan ditemukan</div>
        <div>Coba ubah filter atau periode pencarian.</div>
      </div>
    </div>

    <!-- Modal Preview -->
    <div v-if="selectedReport" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl border-4 border-gray-200 max-w-3xl w-full max-h-[80vh] overflow-y-auto animate-grow">
        <div class="p-6 border-b flex justify-between items-center bg-gray-100 rounded-t-2xl">
          <h3 class="text-2xl font-extrabold text-gray-800 flex items-center gap-2">📄 {{ selectedReport.title }}</h3>
          <button @click="selectedReport = null" class="text-2xl font-bold text-gray-400 hover:text-red-500 transition-colors">&times;</button>
        </div>
        <div class="p-6 space-y-4 text-gray-700">
          <div class="grid grid-cols-2 gap-4 mb-2">
            <div><strong>Periode:</strong> <span class="text-blue-700">{{ selectedReport.period }}</span></div>
            <div><strong>Unit:</strong> <span class="text-indigo-700">{{ selectedReport.unit }}</span></div>
            <div><strong>Jenis:</strong> <span class="text-purple-700">{{ typeLabel(selectedReport.type) }}</span></div>
            <div><strong>Status:</strong> <span :class="statusColor(selectedReport.status)">{{ selectedReport.status === 'final' ? 'Final' : 'Draft' }}</span></div>
            <div><strong>Dibuat:</strong> <span class="text-gray-700">{{ selectedReport.date }}</span></div>
          </div>
          <div class="border-t pt-4">
            <h4 class="font-semibold mb-2 text-gray-800">Ringkasan Isi:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li v-for="(item, i) in selectedReport.summary" :key="i">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div class="p-6 border-t flex justify-end gap-3 bg-gray-100 rounded-b-2xl">
          <button @click="selectedReport = null" class="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition">Tutup</button>
          <button @click="downloadReport(selectedReport, 'pdf')" class="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold flex items-center gap-1 hover:bg-red-700 transition">📄 Download PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'pimpinan' })

// Data Dummy
const reports = ref([
  {
    id: 1,
    title: 'Laporan Kinerja Triwulan I 2025',
    period: 'Jan - Mar 2025',
    unit: 'Seluruh Organisasi',
    type: 'triwulan',
    status: 'final',
    date: '02 Apr 2025',
    summary: [
      'Rata-rata kinerja: 82%',
      '2 unit di bawah standar',
      'Peningkatan kinerja IT sebesar 15%',
      'Rekomendasi pelatihan untuk unit Keuangan'
    ]
  },
  {
    id: 2,
    title: 'Analisis Capaian Indikator Strategis',
    period: '2024',
    unit: 'Pusat Perencanaan',
    type: 'analisis',
    status: 'final',
    date: '15 Jan 2025',
    summary: [
      'Indikator kebijakan meningkat 12%',
      'Kompetensi JF masih di bawah target',
      'Revisi program pelatihan direkomendasikan'
    ]
  },
  {
    id: 3,
    title: 'Laporan Bulanan Unit HRD',
    period: 'Maret 2025',
    unit: 'HRD',
    type: 'bulanan',
    status: 'final',
    date: '05 Apr 2025',
    summary: [
      '100% rekrutmen terpenuhi',
      'Pelatihan onboarding selesai tepat waktu',
      'Kepuasan pegawai: 88%'
    ]
  },
  {
    id: 4,
    title: 'Draf Laporan Tahunan 2025',
    period: 'Q1 2025',
    unit: 'Biro Umum',
    type: 'tahunan',
    status: 'draft',
    date: '10 Apr 2025',
    summary: [
      'Proyeksi kinerja tahun ini',
      'Anggaran operasional',
      'Rencana pengembangan SDM'
    ]
  }
])

// State
const searchQuery = ref('')
const filterPeriod = ref('')
const filterType = ref('')
const selectedReport = ref(null)

// Computed: Filter
const filteredReports = computed(() => {
  return reports.value.filter(rep => {
    const matchesSearch = rep.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          rep.unit.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesPeriod = !filterPeriod.value || rep.period.includes(filterPeriod.value)
    const matchesType = !filterType.value || rep.type === filterType.value
    return matchesSearch && matchesPeriod && matchesType
  })
})

// Helper
const typeLabel = (type) => {
  const labels = {
    bulanan: 'Bulanan',
    triwulan: 'Triwulan',
    tahunan: 'Tahunan',
    analisis: 'Analisis'
  }
  return labels[type] || type
}

const statusColor = (status) => {
  return status === 'final' ? 'text-green-600 font-bold' : 'text-yellow-600'
}

// Aksi
const previewReport = (report) => {
  selectedReport.value = report
}

const downloadReport = (report, format) => {
  alert(`Mengunduh ${report.title} dalam format ${format.toUpperCase()}...`)
  // Di sini bisa integrasi dengan API atau library seperti pdf-lib
}
</script>

<style scoped>
/* Smooth hover */
.card-report {
  transition: box-shadow 0.25s, transform 0.25s, background 0.25s;
}
.card-report:hover {
  box-shadow: 0 12px 36px 0 rgba(60, 60, 180, 0.20);
  transform: translateY(-6px) scale(1.04);
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%);
}
.animate-grow {
  transition: transform 0.2s;
}
.animate-grow:hover {
  transform: translateY(-2px) scale(1.02);
}
</style>