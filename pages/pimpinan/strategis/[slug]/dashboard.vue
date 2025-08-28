<template>
  <div class="max-w-5xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Dashboard Capaian Unit Kerja</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="text-4xl font-bold text-info mb-2">{{ summary.unitKerja }}</div>
          <div class="text-gray-500">Total Unit Kerja</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="text-4xl font-bold text-success mb-2">{{ summary.tercapai }}</div>
          <div class="text-gray-500">Unit Tercapai</div>
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
        <h2 class="text-lg font-semibold mb-4">Capaian Unit Kerja Terbaru</h2>
        <table class="table table-zebra table-bordered w-full border-collapse">
          <thead class="bg-info text-center">
            <tr>
              <th>Unit Kerja</th>
              <th>Nama Capaian</th>
              <th>Indikator</th>
              <th>Target</th>
              <th>Realisasi</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in capaianTerbaru" :key="row.id">
              <td>{{ row.unit_kerja }}</td>
              <td>{{ row.nama }}</td>
              <td>{{ row.indikator }}</td>
              <td>{{ row.target }}</td>
              <td>{{ row.realisasi }}</td>
              <td>
                <progress class="progress progress-info w-32" :value="row.progress" max="100"></progress>
                <span class="ml-2">{{ row.progress }}%</span>
              </td>
              <td>
                <span :class="{
                  'badge badge-warning': row.status === 'On Progress',
                  'badge badge-success': row.status === 'Tercapai',
                  'badge badge-ghost': row.status === 'Belum Mulai'
                }">{{ row.status }}</span>
              </td>
            </tr>
            <tr v-if="capaianTerbaru.length === 0">
              <td colspan="7" class="text-center text-gray-400">Belum ada capaian</td>
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
  unitKerja: 3,
  tercapai: 1,
  progress: 78
})
const capaianTerbaru = ref([
  {
    id: 1,
    unit_kerja: 'DINAS ENERGI DAN SUMBER DAYA MINERAL',
    nama: 'Penurunan Emisi Gas Rumah Kaca',
    indikator: 'Tingkat Penurunan Emisi',
    target: '7.68',
    realisasi: '6.50',
    progress: 85,
    status: 'Tercapai'
  },
  {
    id: 2,
    unit_kerja: 'INSPEKTORAT DAERAH',
    nama: 'Evaluasi Akuntabilitas Internal',
    indikator: 'Nilai SAKIP',
    target: '100',
    realisasi: '80',
    progress: 80,
    status: 'On Progress'
  },
  {
    id: 3,
    unit_kerja: 'DINAS KESEHATAN',
    nama: 'Peningkatan Imunisasi',
    indikator: 'Jumlah Anak Imunisasi',
    target: '5000',
    realisasi: '3500',
    progress: 70,
    status: 'On Progress'
  }
])
</script>

<style scoped>
.card {
  margin-bottom: 1.5rem;
}
</style>
