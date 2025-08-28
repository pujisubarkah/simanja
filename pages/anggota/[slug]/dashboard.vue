<!-- /pages/anggota/[slug]/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900">
          Halo, {{ userStore.user?.nama_lengkap || 'User' }} 👋
        </h1>
        <p class="text-gray-600">Ini adalah dashboard kinerja Anda.</p>
      </div>

      <!-- Ringkasan -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow text-center border-l-4 border-blue-500">
          <div class="text-2xl font-bold text-blue-700">{{ totalTarget }}</div>
          <div class="text-gray-600 text-sm">Target Aktif</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center border-l-4 border-green-500">
          <div class="text-2xl font-bold text-green-700">{{ rataRataProgres }}%</div>
          <div class="text-gray-600 text-sm">Rata-rata Progres</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow text-center border-l-4 border-yellow-500">
          <div class="text-2xl font-bold text-yellow-700">{{ terlambat }}</div>
          <div class="text-gray-600 text-sm">Tugas Terlambat</div>
        </div>
      </div>

      <!-- Aksi Cepat -->
      <div class="bg-white p-6 rounded-xl shadow mb-8">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">🚀 Aksi Cepat</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink 
            :to="`/anggota/${slug}/progress`" 
            class="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition font-semibold"
          >
            ✍️ Input Progres Hari Ini
          </NuxtLink>
          <NuxtLink 
            :to="`/anggota/${slug}/self-assessment`" 
            class="p-4 text-center bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition font-semibold"
          >
            📝 Isi Self-Assessment
          </NuxtLink>
        </div>
      </div>

      <!-- Target Terbaru -->
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">🎯 Target Terbaru</h2>
        <ul class="space-y-3">
          <li v-for="t in targetAktif" :key="t.id" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>{{ t.nama }}</span>
            <span class="text-sm text-blue-600">{{ t.progres }}%</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

// Hapus layout khusus, gunakan default yang sudah dinamis
// definePageMeta({ layout: 'anggota' })
const { slug } = useRoute().params

// Data dummy
const totalTarget = 4
const rataRataProgres = 82
const terlambat = 1

const targetAktif = ref([
  { id: 1, nama: 'Laporan Bulanan', progres: 90 },
  { id: 2, nama: 'Input Data Kegiatan', progres: 85 },
  { id: 3, nama: 'Pelatihan Internal', progres: 70 },
  { id: 4, nama: 'Review Dokumen', progres: 100 }
])

console.log('User Pinia:', userStore.user)
</script>