<!-- /pages/anggota/[slug]/target.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">🎯 Target Saya</h1>
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 text-left">Nama Target</th>
            <th class="p-4 text-left">Periode</th>
            <th class="p-4 text-left">Target</th>
            <th class="p-4 text-left">Progres</th>
            <th class="p-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in targets" :key="t.id" class="border-t hover:bg-gray-50">
            <td class="p-4 font-medium">{{ t.nama }}</td>
            <td class="p-4 text-gray-600">{{ t.periode }}</td>
            <td class="p-4">{{ t.target }}</td>
            <td class="p-4">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full bg-blue-500" :style="{ width: t.progres + '%' }"></div>
              </div>
              <span class="text-sm text-gray-600 mt-1 block">{{ t.progres }}%</span>
            </td>
            <td class="p-4">
              <span class="px-2 py-1 rounded-full text-xs" :class="statusClass(t.progres)">
                {{ statusText(t.progres) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

const targets = ref([
  { id: 1, nama: 'Laporan Bulanan', periode: 'Apr 2025', target: 'Selesai', progres: 90 },
  { id: 2, nama: 'Input Data', periode: 'Setiap hari', target: '10 data/hari', progres: 85 },
  { id: 3, nama: 'Pelatihan', periode: 'Q2 2025', target: '90%', progres: 70 },
])

const statusText = (p) => p >= 80 ? 'Baik' : p >= 60 ? 'Perlu Perhatian' : 'Rendah'
const statusClass = (p) => p >= 80 ? 'bg-green-100 text-green-800' : p >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
</script>