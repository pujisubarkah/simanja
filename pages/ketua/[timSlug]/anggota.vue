<!-- /pages/ketua-tim/[timSlug]/anggota.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">👥 Anggota Tim {{ timSlug }}</h1>
      <div class="text-sm text-gray-500 mt-2 md:mt-0">
        {{ totalAnggota }} anggota
      </div>
    </div>
    <!-- Tabel Anggota -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 text-left font-semibold text-gray-700">Nama</th>
            <th class="p-4 text-left font-semibold text-gray-700">Peran</th>
            <th class="p-4 text-left font-semibold text-gray-700">Kinerja</th>
            <th class="p-4 text-left font-semibold text-gray-700">Progres</th>
            <th class="p-4 text-left font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="anggota in anggotaTim" :key="anggota.id" class="hover:bg-gray-50">
            <td class="p-4 font-medium">{{ anggota.nama }}</td>
            <td class="p-4 text-gray-600">{{ anggota.peran }}</td>
            <td class="p-4 font-semibold" :class="textColor(anggota.kinerja)">{{ anggota.kinerja }}%</td>
            <td class="p-4">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full" 
                  :class="progressColor(anggota.kinerja)"
                  :style="{ width: anggota.kinerja + '%' }"
                ></div>
              </div>
            </td>
            <td class="p-4">
              <NuxtLink 
                :to="`/ketua/${timSlug}/evaluasi?anggota=${anggota.slug}`" 
                class="text-blue-600 hover:underline text-sm font-medium"
              >
                Beri Evaluasi →
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const timSlug = useRoute().params.timSlug
const anggotaTim = ref([
  { id: 1, nama: 'Andi Prasetyo', peran: 'Staff Marketing', kinerja: 90, slug: 'andi' },
  { id: 2, nama: 'Budi Santoso', peran: 'Desainer Grafis', kinerja: 75, slug: 'budi' },
  { id: 3, nama: 'Citra Dewi', peran: 'Content Writer', kinerja: 88, slug: 'citra' },
  { id: 4, nama: 'Dewi Lestari', peran: 'Social Media', kinerja: 64, slug: 'dewi' },
  { id: 5, nama: 'Eka Pratama', peran: 'Video Editor', kinerja: 82, slug: 'eka' }
])
const totalAnggota = anggotaTim.value.length
const textColor = (k) => k >= 80 ? 'text-green-600' : k >= 60 ? 'text-yellow-600' : 'text-red-600'
const progressColor = (k) => k >= 80 ? 'bg-green-500' : k >= 60 ? 'bg-yellow-500' : 'bg-red-500'
</script>