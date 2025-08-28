<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">📊 Perjanjian Kinerja (PK)</h1>
    </div>

    <!-- Filter Satuan Kerja -->
    <div class="mb-4 flex gap-4">
      <div>
        <label class="font-bold mb-2 block">Filter Satuan Kerja</label>
        <select v-model="selectedSatker" class="select select-bordered w-full">
          <option value="">Pilih satuan kerja</option>
          <option v-for="satker in satkerList" :key="satker" :value="satker">{{ satker }}</option>
        </select>
      </div>
    </div>

    <!-- Table PK -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered">
            <thead class="bg-info text-center">
              <tr>
                <th>No</th>
                <th>Satuan Kerja</th>
                <th>Sasaran</th>
                <th>Indikator</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredPkData" :key="row.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ row.satker }}</td>
                <td>{{ row.sasaran }}</td>
                <td>{{ row.indikator }}</td>
                <td>{{ row.target }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const pkData = ref([
  { id: 1, satker: 'DINAS ENERGI DAN SUMBER DAYA MINERAL', sasaran: 'Menurunnya Emisi Gas Rumah Kaca Sektor Energi', indikator: 'Tingkat Upaya Penurunan Emisi Gas Rumah Kaca Sektor Energi', target: '7.68' },
  { id: 2, satker: 'INSPEKTORAT DAERAH', sasaran: 'Meningkatnya kualitas evaluasi akuntabilitas internal Pemerintah Daerah', indikator: '(Nilai SAKIP Pemerintah Daerah dimensi evaluasi)', target: '100' },
  // ...lanjutkan data sesuai kebutuhan...
])

const satkerList = ref([
  ...new Set(pkData.value.map(row => row.satker))
])
const selectedSatker = ref('')
const filteredPkData = computed(() =>
  selectedSatker.value
    ? pkData.value.filter(r => r.satker === selectedSatker.value)
    : pkData.value
)
</script>