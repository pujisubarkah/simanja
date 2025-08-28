<!-- /pages/pimpinan/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 mb-2 flex items-center justify-center gap-4">
        <span class="inline-block p-3 bg-white bg-opacity-80 rounded-full shadow-md">🧑‍💼</span>
        Dashboard <span v-if="userStore.user?.nama_lengkap">{{ userStore.user.nama_lengkap }}</span>
      </h1>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">Ringkasan kinerja, tren, dan aksi cepat untuk monitoring organisasi.</p>
    </div>

    <!-- Ringkasan Kinerja (Cards) -->
  <div class="flex flex-row gap-6 mb-8 flex-wrap justify-center">
      <!-- Total Unit -->
      <div class="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-56">
        <div class="text-4xl mb-2">🏢</div>
        <div class="text-3xl font-bold text-blue-800">8</div>
        <div class="text-gray-500 text-sm">Total Unit</div>
      </div>
      <div class="bg-white/90 backdrop-blur-sm border border-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-56">
        <div class="text-4xl mb-2">📈</div>
        <div class="text-3xl font-bold text-green-800">82%</div>
        <div class="text-gray-500 text-sm">Rata-rata Kinerja</div>
      </div>
      <div class="bg-white/90 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-56">
        <div class="text-4xl mb-2">⚠️</div>
        <div class="text-3xl font-bold text-yellow-700">2</div>
        <div class="text-gray-500 text-sm">Butuh Perhatian</div>
      </div>
      <div class="bg-white/90 backdrop-blur-sm border border-red-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center w-56">
        <div class="text-4xl mb-2">📥</div>
        <div class="text-3xl font-bold text-red-700">3</div>
        <div class="text-gray-500 text-sm">Laporan Menunggu</div>
      </div>
    </div>

    <!-- Grafik Tren Kinerja -->
    <div class="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg mb-8">
      <h2 class="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2"><span>📊</span> Tren Kinerja (6 Bulan Terakhir)</h2>
      <div class="h-48 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-around px-4 text-sm text-gray-700 font-medium">
        <div class="text-center">
          <div class="font-semibold text-blue-700">Jan</div>
          <div class="mt-2 px-2 py-1 bg-blue-100 rounded-lg font-bold">78%</div>
        </div>
        <div class="text-center">
          <div class="font-semibold text-blue-700">Feb</div>
          <div class="mt-2 px-2 py-1 bg-blue-200 rounded-lg font-bold">80%</div>
        </div>
        <div class="text-center">
          <div class="font-semibold text-green-700">Mar</div>
          <div class="mt-2 px-2 py-1 bg-green-200 rounded-lg font-bold">85%</div>
        </div>
        <div class="text-center">
          <div class="font-semibold text-yellow-700">Apr</div>
          <div class="mt-2 px-2 py-1 bg-yellow-100 rounded-lg font-bold">79%</div>
        </div>
        <div class="text-center">
          <div class="font-semibold text-red-700">Mei</div>
          <div class="mt-2 px-2 py-1 bg-red-100 rounded-lg font-bold">72%</div>
        </div>
        <div class="text-center">
          <div class="font-semibold text-green-700">Jun</div>
          <div class="mt-2 px-2 py-1 bg-green-100 rounded-lg font-bold">88%</div>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-2">*Data simulasi untuk demonstrasi</p>
    </div>

    <!-- Unit dengan Kinerja Rendah -->
    <div class="bg-white/90 backdrop-blur-sm border border-red-100 rounded-2xl p-6 shadow-lg mb-8">
      <h2 class="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2"><span>⚠️</span> Unit yang Perlu Perhatian</h2>
      <div class="space-y-4">
        <div v-for="unit in underperformingUnits" :key="unit.name" class="flex items-center justify-between p-4 bg-red-50/70 rounded-xl border border-red-200 shadow hover:shadow-lg transition">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🏢</span>
            <div>
              <div class="font-semibold text-gray-800">{{ unit.name }}</div>
              <div class="text-sm text-gray-500">Ketua: {{ unit.leader }}</div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-sm">{{ unit.performance }}%</span>
            <NuxtLink 
              :to="`/pimpinan/kinerja-unit?unit=${unit.slug}`" 
              class="text-blue-600 text-sm font-semibold hover:underline hover:text-blue-800"
            >
              Lihat Detail →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Aksi Cepat -->
    <div class="bg-white/90 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 shadow-lg">
      <h2 class="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2"><span>🚀</span> Aksi Cepat</h2>
      <div class="flex flex-row gap-4 flex-wrap justify-center">
        <NuxtLink 
          to="/pimpinan/approval" 
          class="p-5 text-center bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 shadow transition-all duration-200 w-56 flex flex-col items-center animate-grow"
        >
          <div class="text-3xl mb-2">📄</div>
          <div class="font-semibold text-blue-800">Laporan Menunggu</div>
          <div class="text-sm text-blue-600">Setujui 3 dokumen</div>
        </NuxtLink>
        <NuxtLink 
          to="/pimpinan/kinerja-unit" 
          class="p-5 text-center bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 shadow transition-all duration-200 w-56 flex flex-col items-center animate-grow"
        >
          <div class="text-3xl mb-2">📊</div>
          <div class="font-semibold text-green-800">Monitoring Unit</div>
          <div class="text-sm text-green-600">Lihat semua unit</div>
        </NuxtLink>
        <NuxtLink 
          to="/pimpinan/laporan" 
          class="p-5 text-center bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 shadow transition-all duration-200 w-56 flex flex-col items-center animate-grow"
        >
          <div class="text-3xl mb-2">📥</div>
          <div class="font-semibold text-purple-800">Unduh Laporan</div>
          <div class="text-sm text-purple-600">Format PDF/Excel</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
import { useRoute } from 'vue-router'
const route = useRoute()
const slug = route.params.slug || ''

// Middleware dinonaktifkan sementara
// definePageMeta({ middleware: ['auth'] })


// Data dummy untuk unit bermasalah
const underperformingUnits = [
  {
    name: 'Unit IT',
    leader: 'Budi Santoso',
    performance: 68,
    slug: 'it'
  },
  {
    name: 'Unit Keuangan',
    leader: 'Citra Dewi',
    performance: 64,
    slug: 'keuangan'
  }
]

// Di sini nanti bisa pakai composables:
// const { underperformingUnits } = usePerformanceReport()
</script>

<style scoped>
/* Optional: tambah sedikit animasi */
.animate-grow {
  transition: transform 0.2s;
}
.animate-grow:hover {
  transform: translateY(-2px);
}
</style>