<template>
  <div class="max-w-5xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Dashboard Unit</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="text-4xl font-bold text-info mb-2">{{ summary.kegiatan }}</div>
          <div class="text-gray-500">Total Kegiatan</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="text-4xl font-bold text-success mb-2">{{ summary.selesai }}</div>
          <div class="text-gray-500">Kegiatan Selesai</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="text-4xl font-bold text-warning mb-2">{{ summary.progress }}%</div>
          <div class="text-gray-500">Rata-rata Progress</div>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h2 class="text-lg font-semibold mb-4">Kegiatan Terbaru</h2>
        <table class="table table-zebra table-bordered w-full border-collapse">
          <thead class="bg-info text-center">
            <tr>
              <th>Nama Kegiatan</th>
              <th>Ketua Tim</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in kegiatanTerbaru" :key="row.id">
              <td>{{ row.nama }}</td>
              <td>{{ row.ketua }}</td>
              <td>
                <progress class="progress progress-info w-32" :value="row.progress" max="100"></progress>
                <span class="ml-2">{{ row.progress }}%</span>
              </td>
              <td>
                <span :class="{
                  'badge badge-warning': row.status === 'On Progress',
                  'badge badge-success': row.status === 'Selesai',
                  'badge badge-ghost': row.status === 'Belum Mulai'
                }">{{ row.status }}</span>
              </td>
            </tr>
            <tr v-if="kegiatanTerbaru.length === 0">
              <td colspan="4" class="text-center text-gray-400">Belum ada kegiatan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const summary = ref({
  kegiatan: 5,
  selesai: 2,
  progress: 60
})
const kegiatanTerbaru = ref([
  { id: 1, nama: 'Kegiatan A', ketua: 'Budi Santoso', progress: 80, status: 'Selesai' },
  { id: 2, nama: 'Kegiatan B', ketua: 'Siti Aminah', progress: 60, status: 'On Progress' },
  { id: 3, nama: 'Kegiatan C', ketua: 'Andi Wijaya', progress: 40, status: 'On Progress' }
])
</script>

<style scoped>
.card {
  margin-bottom: 1.5rem;
}
</style>
