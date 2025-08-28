<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-8 text-green-700 flex items-center gap-2">
      <span>📑</span> Renstra (Strategis 5 Tahunan)
    </h1>
    <div class="card-body">
      <div class="row">
        <div class="col-sm-6 col-md-4">
          <div role="group" class="form-group">
            <label for="filter-satker" class="d-block font-weight-bold">Filter Satuan Kerja</label>
            <div>
              <!-- v-select, fallback ke input jika tidak ada v-select -->
              <input id="filter-satker" v-model="selectedSatker" list="satkerList" placeholder="Pilih satuan kerja" class="form-control" />
              <datalist id="satkerList">
                <option v-for="satker in satkerList" :key="satker" :value="satker">{{ satker }}</option>
              </datalist>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Card>
      <CardContent>
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered w-full text-left border-collapse">
            <thead class="bg-info text-center">
              <tr class="border-b">
                <th class="p-2" rowspan="2">No</th>
                <th class="p-2" rowspan="2">Satuan Kerja</th>
                <th class="p-2" rowspan="2">Sasaran</th>
                <th class="p-2" rowspan="2">Indikator</th>
                <th class="p-2" colspan="5">Target Tahun ke-</th>
              </tr>
              <tr class="border-b">
                <th class="p-2">1</th>
                <th class="p-2">2</th>
                <th class="p-2">3</th>
                <th class="p-2">4</th>
                <th class="p-2">5</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredRenstra" :key="row.id" class="border-b hover:bg-gray-50">
                <td class="p-2 text-center">{{ idx + 1 }}</td>
                <td class="p-2">{{ row.satker }}</td>
                <td class="p-2">{{ row.sasaran }}</td>
                <td class="p-2">{{ row.indikator }}</td>
                <td class="p-2">{{ row.target1 }}</td>
                <td class="p-2">{{ row.target2 }}</td>
                <td class="p-2">{{ row.target3 }}</td>
                <td class="p-2">{{ row.target4 }}</td>
                <td class="p-2">{{ row.target5 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
    <!-- Modal/tambah/edit bisa ditambahkan sesuai kebutuhan -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const filterText = ref('')
const selectedSatker = ref('')
const renstraData = ref([
  {
    id: 1,
    satker: 'DINAS SOSIAL',
    sasaran: 'Meningkatnya Taraf Kesejahteraan Sosial Penduduk Miskin dan Rentan',
    indikator: 'Indeks Kesejahteraan Sosial',
    target1: 43.32,
    target2: 43.72,
    target3: 44.12,
    target4: 0,
    target5: 0
  },
  {
    id: 2,
    satker: 'BADAN PERENCANAAN PEMBANGUNAN DAERAH',
    sasaran: 'Meningkatnya kualitas perencanaan pembangunan Jawa Barat yang berdampak untuk mewujudkan hasil yang berkesinambungan',
    indikator: 'Nilai komponen perencanaan kinerja pada penilaian SAKIP Provinsi',
    target1: 25.9,
    target2: 26,
    target3: 26.15,
    target4: 0,
    target5: 0
  },
  {
    id: 3,
    satker: 'INSPEKTORAT DAERAH',
    sasaran: 'Meningkatnya kualitas evaluasi akuntabilitas internal Pemerintah Daerah',
    indikator: '(Nilai SAKIP Pemerintah Daerah dimensi evaluasi)',
    target1: 100,
    target2: 100,
    target3: 100,
    target4: 100,
    target5: 100
  },
  {
    id: 4,
    satker: 'BADAN PENGELOLAAN KEUANGAN DAN ASET DAERAH',
    sasaran: 'Terwujudnya Pengelolaan Keuangan dan Barang Milik Daerah Sesuai Dengan Ketentuan Peraturan Perundang-undangan yang Berlaku',
    indikator: 'Opini BPK Terhadap Laporan Keuangan Pemerintah Daerah',
    target1: 100,
    target2: 100,
    target3: 100,
    target4: 100,
    target5: 100
  },
  {
    id: 5,
    satker: 'DINAS PERINDUSTRIAN DAN PERDAGANGAN',
    sasaran: 'Meningkatnya PDRB Industri Pengolahan Jawa Barat',
    indikator: 'Nilai PDRB Industri Pengolahan',
    target1: 1117.21,
    target2: 1167.82,
    target3: 1219.9,
    target4: 0,
    target5: 0
  }
])

const satkerList = ref([...new Set(renstraData.value.map(row => row.satker))])

const filteredRenstra = computed(() => {
  let data = renstraData.value
  if (selectedSatker.value) {
    data = data.filter(row => row.satker === selectedSatker.value)
  }
  return data
})
</script>

<style>
/* ...style opsional... */
</style>
