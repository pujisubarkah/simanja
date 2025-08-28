<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">📊 Perjanjian Kinerja (PK)</h1>
    </div>

    <!-- Filter Unit Kerja -->
    <div class="mb-4 flex gap-4">
      <div>
        <label class="font-bold mb-2 block">Filter Unit Kerja</label>
        <select v-model="selectedUnitKerja" class="select select-bordered w-full">
          <option value="">Pilih unit kerja</option>
          <option v-for="unit in unitKerjaList" :key="unit" :value="unit">{{ unit }}</option>
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
                <th>Unit Kerja</th>
                <th>Sasaran</th>
                <th>Indikator</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredPkData" :key="row.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ row.unit_kerja }}</td>
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
  { id: 1, unit_kerja: 'DINAS ENERGI DAN SUMBER DAYA MINERAL', sasaran: 'Menurunnya Emisi Gas Rumah Kaca Sektor Energi', indikator: 'Tingkat Upaya Penurunan Emisi Gas Rumah Kaca Sektor Energi', target: '7.68' },
  { id: 2, unit_kerja: 'INSPEKTORAT DAERAH', sasaran: 'Meningkatnya kualitas evaluasi akuntabilitas internal Pemerintah Daerah', indikator: '(Nilai SAKIP Pemerintah Daerah dimensi evaluasi)', target: '100' },
  // ...lanjutkan data sesuai kebutuhan...
])
const unitKerjaList = ref([
  ...new Set(pkData.value.map(row => row.unit_kerja))
])
const selectedUnitKerja = ref('')
const filteredPkData = computed(() =>
  selectedUnitKerja.value
    ? pkData.value.filter(r => r.unit_kerja === selectedUnitKerja.value)
    : pkData.value
)
</script>