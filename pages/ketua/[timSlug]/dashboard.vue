<!-- /pages/ketua-tim/[timSlug]/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-blue-900">📊 Dashboard Tim {{ timSlug }}</h1>
      <p class="text-gray-600">Pantau kinerja tim Anda secara real-time.</p>
    </div>

    <!-- Ringkasan -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow text-center border-l-4 border-blue-500">
        <div class="text-2xl font-bold text-blue-700">{{ totalAnggota }}</div>
        <div class="text-gray-600 text-sm">Anggota Tim</div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow text-center border-l-4 border-green-500">
        <div class="text-2xl font-bold text-green-700">{{ rataRataKinerja }}%</div>
        <div class="text-gray-600 text-sm">Rata-rata Kinerja</div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow text-center border-l-4 border-yellow-500">
        <div class="text-2xl font-bold text-yellow-700">{{ butuhPerhatian }}</div>
        <div class="text-gray-600 text-sm">Butuh Perhatian</div>
      </div>
    </div>

    <!-- Progres Tim -->
    <div class="bg-white rounded-xl shadow p-6 mb-8">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Progres Kinerja Tim</h2>
      <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          class="h-3 rounded-full bg-blue-600 transition-all duration-1000" 
          :style="{ width: rataRataKinerja + '%' }"
        ></div>
      </div>
      <div class="text-sm text-gray-500">Target: 80%</div>
    </div>

    <!-- Aksi Cepat -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">🚀 Aksi Cepat</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink 
          :to="`/ketua-tim/${timSlug}/evaluasi`" 
          class="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
        >
          ✍️ Evaluasi Anggota
        </NuxtLink>
        <NuxtLink 
          :to="`/ketua-tim/${timSlug}/anggota`" 
          class="p-4 text-center bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition"
        >
          👥 Lihat Semua Anggota
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'ketua' })
const timSlug = useRoute().params.timSlug

// Data dummy
const totalAnggota = 5
const rataRataKinerja = 82
const butuhPerhatian = 1
</script>