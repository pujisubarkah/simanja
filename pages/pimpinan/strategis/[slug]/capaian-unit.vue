<template>
  <div class="max-w-6xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Capaian Unit Kerja</h1>
    <div class="card bg-base-100 shadow mb-6">
      <div class="card-body">
        <div class="flex gap-4 mb-4">
          <select v-model="filterUnitKerja" class="select select-bordered">
            <option value="">Semua Unit Kerja</option>
            <option v-for="unit in unitKerjaList" :key="unit" :value="unit">{{ unit }}</option>
          </select>
          <input v-model="searchNama" type="text" class="input input-bordered" placeholder="Cari nama capaian..." />
        </div>
        <div class="overflow-x-auto">
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
              <tr v-for="row in filteredCapaian" :key="row.id">
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
              <tr v-if="filteredCapaian.length === 0">
                <td colspan="7" class="text-center text-gray-400">Tidak ada capaian</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const capaianList = ref([
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
const unitKerjaList = ref([
  ...new Set(capaianList.value.map(row => row.unit_kerja))
])
const filterUnitKerja = ref('')
const searchNama = ref('')
const filteredCapaian = computed(() => {
  let arr = capaianList.value
  if (filterUnitKerja.value) {
    arr = arr.filter(c => c.unit_kerja === filterUnitKerja.value)
  }
  if (searchNama.value) {
    arr = arr.filter(c => c.nama.toLowerCase().includes(searchNama.value.toLowerCase()))
  }
  return arr
})
</script>
<style scoped>
.card {
  margin-bottom: 1.5rem;
}
</style>
