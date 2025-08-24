<!-- /pages/pimpinan/indikator.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 mb-3 flex items-center justify-center gap-4">
        <span class="inline-block p-3 bg-white bg-opacity-80 rounded-full shadow-md">📊</span>
        Indikator Kinerja Strategis
      </h1>
      <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
        Pantau capaian kinerja organisasi secara real-time dan identifikasi area yang perlu intervensi.
      </p>
    </div>

    <!-- Summary Cards -->
  <div class="flex flex-row gap-6 mb-8 flex-wrap">
      <!-- Total -->
      <div class="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-3">
          <div class="text-3xl">📋</div>
          <div class="text-sm font-semibold text-blue-600">Total</div>
        </div>
        <div class="text-3xl font-bold text-blue-800">{{ totalIndicators }}</div>
        <div class="text-gray-500 text-sm">Indikator Terdaftar</div>
      </div>

      <!-- Baik -->
      <div class="bg-white/90 backdrop-blur-sm border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-3">
          <div class="text-3xl">✅</div>
          <div class="text-sm font-semibold text-green-600">Baik</div>
        </div>
        <div class="text-3xl font-bold text-green-800">{{ goodCount }}</div>
        <div class="text-gray-500 text-sm">≥ 80%</div>
      </div>

      <!-- Perlu Perhatian -->
      <div class="bg-white/90 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-3">
          <div class="text-3xl">⚠️</div>
          <div class="text-sm font-semibold text-yellow-600">Perlu Perhatian</div>
        </div>
        <div class="text-3xl font-bold text-yellow-800">{{ warningCount }}</div>
        <div class="text-gray-500 text-sm">60% – 79%</div>
      </div>

      <!-- Rendah -->
      <div class="bg-white/90 backdrop-blur-sm border border-red-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-3">
          <div class="text-3xl">❌</div>
          <div class="text-sm font-semibold text-red-600">Rendah</div>
        </div>
        <div class="text-3xl font-bold text-red-800">{{ lowCount }}</div>
        <div class="text-gray-500 text-sm">< 60%</div>
      </div>
    </div>

    <!-- Filter & Aksi -->
    <div class="bg-white border rounded-xl shadow-sm mb-8 p-4">
      <div class="flex flex-wrap gap-2 items-center">
        <div class="flex items-center gap-2">
          <span class="text-gray-500">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari indikator..." 
            class="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>
        <select v-model="filterProgram" class="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
          <option value="">Semua Program</option>
          <option v-for="p in programs" :key="p.slug" :value="p.slug">{{ p.name }}</option>
        </select>
        <select v-model="filterStatus" class="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
          <option value="">Semua Status</option>
          <option value="baik">Baik</option>
          <option value="perlu-perhatian">Perlu Perhatian</option>
          <option value="rendah">Rendah</option>
        </select>
        <button @click="resetFilter" class="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">🔄 Reset</button>
        <button @click="exportToExcel" class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">📥 Export</button>
      </div>
    </div>

    <!-- Tabel Indikator -->
    <div class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10">
            <tr class="text-left text-sm text-gray-700 font-semibold">
              <th class="p-5">Indikator Kinerja</th>
              <th class="p-5">Program</th>
              <th class="p-5">Target</th>
              <th class="p-5">Capaian</th>
              <th class="p-5">Progres</th>
              <th class="p-5">Status</th>
              <th class="p-5">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr 
              v-for="ind in filteredIndicators" 
              :key="ind.id" 
              class="hover:bg-blue-50/50 transition-all duration-200 hover:shadow-sm"
            >
              <td class="p-5 font-medium text-gray-800 leading-tight">
                <span class="inline-block mr-2 text-xl align-middle">📈</span>
                {{ ind.name }}
              </td>
              <td class="p-5 text-gray-600">{{ ind.program }}</td>
              <td class="p-5 text-gray-700 font-medium">{{ ind.target }}</td>
              <td class="p-5 font-bold" :class="textColor(ind.progress)">{{ ind.progress }}%</td>
              <td class="p-5">
                <div class="w-40 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-3 rounded-full transition-all duration-1000 ease-out"
                    :class="progressColor(ind.progress)"
                    :style="{ width: ind.progress + '%' }"
                  ></div>
                </div>
              </td>
              <td class="p-5">
                <span 
                  class="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                  :class="statusBadge(ind.progress)"
                >
                  <span v-if="ind.progress >= 80" class="text-green-100">🟢</span>
                  <span v-else-if="ind.progress >= 60" class="text-yellow-100">🟡</span>
                  <span v-else class="text-red-100">🔴</span>
                  {{ statusText(ind.progress) }}
                </span>
              </td>
              <td class="p-5">
                <NuxtLink 
                  :to="`/pimpinan/pohon-kinerja?highlight=${ind.slug}`" 
                  class="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm inline-flex items-center gap-1"
                >
                  🔍 Lihat di Pohon
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredIndicators.length === 0" class="p-12 text-center text-gray-500 bg-gray-50/50">
          <div class="text-5xl mb-4">🔍</div>
          <div class="text-xl font-semibold mb-2">Tidak ada indikator yang ditemukan</div>
          <div class="text-gray-400">Coba ubah filter atau kata kunci pencarian.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Reset Filter
const resetFilter = () => {
  searchQuery.value = ''
  filterProgram.value = ''
  filterStatus.value = ''
}
definePageMeta({ layout: 'pimpinan' })

// Data Dummy
const indicators = ref([
  {
    id: 1,
    name: '40% Instansi Pemerintah yang Meningkat Kualitas Tata Kelola Kebijakannya',
    program: 'Peningkatan Kualitas Kebijakan',
    target: '40%',
    progress: 92,
    slug: 'indikator-kebijakan-1'
  },
  {
    id: 2,
    name: '90% JF di Bidang Pengembangan Kapasitas yang Sesuai Standar Kompetensi',
    program: 'Pengembangan Kapasitas',
    target: '90%',
    progress: 68,
    slug: 'indikator-jf-1'
  },
  {
    id: 3,
    name: '100% SKPD Melakukan Evaluasi Kinerja Tahunan',
    program: 'Evaluasi Kinerja',
    target: '100%',
    progress: 75,
    slug: 'indikator-eval-1'
  },
  {
    id: 4,
    name: '80% Pegawai Mengikuti Pelatihan Berbasis Kompetensi',
    program: 'Pelatihan SDM',
    target: '80%',
    progress: 88,
    slug: 'indikator-pelatihan-1'
  }
])

const programs = ref([
  { slug: 'peningkatan-kinerja', name: 'Peningkatan Kualitas Kebijakan' },
  { slug: 'pengembangan-kapasitas', name: 'Pengembangan Kapasitas' },
  { slug: 'evaluasi-kinerja', name: 'Evaluasi Kinerja' },
  { slug: 'pelatihan-sdm', name: 'Pelatihan SDM' }
])

// State Filter
const searchQuery = ref('')
const filterProgram = ref('')
const filterStatus = ref('')

// Computed: Filter Indikator
const filteredIndicators = computed(() => {
  return indicators.value.filter(ind => {
    const matchesSearch = ind.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesProgram = !filterProgram.value || ind.program === getProgramName(filterProgram.value)
    let matchesStatus = true

    if (filterStatus.value === 'baik') matchesStatus = ind.progress >= 80
    else if (filterStatus.value === 'perlu-perhatian') matchesStatus = ind.progress >= 60 && ind.progress < 80
    else if (filterStatus.value === 'rendah') matchesStatus = ind.progress < 60

    return matchesSearch && matchesProgram && matchesStatus
  })
})

// Ringkasan
const totalIndicators = computed(() => indicators.value.length)
const goodCount = computed(() => filteredIndicators.value.filter(i => i.progress >= 80).length)
const warningCount = computed(() => filteredIndicators.value.filter(i => i.progress >= 60 && i.progress < 80).length)
const lowCount = computed(() => filteredIndicators.value.filter(i => i.progress < 60).length)

// Helper
const getProgramName = (slug) => {
  const p = programs.value.find(pr => pr.slug === slug)
  return p ? p.name : ''
}

const textColor = (p) => p >= 80 ? 'text-green-600' : p >= 60 ? 'text-yellow-600' : 'text-red-600'
const progressColor = (p) => p >= 80 ? 'bg-green-500' : p >= 60 ? 'bg-yellow-500' : 'bg-red-500'
const statusText = (p) => p >= 80 ? 'Baik' : p >= 60 ? 'Perlu Perhatian' : 'Rendah'
const statusBadge = (p) => p >= 80 
  ? 'bg-green-100 text-green-800' 
  : p >= 60 
    ? 'bg-yellow-100 text-yellow-800' 
    : 'bg-red-100 text-red-800'

// Export Dummy
const exportToExcel = () => {
  alert('Export ke Excel akan diintegrasikan dengan backend.')
}
</script>

<style scoped>
/* Smooth transition untuk progress bar */
tr:hover td {
  background-color: #eff6ff; /* Tailwind's bg-blue-50 hex value */
}
</style>