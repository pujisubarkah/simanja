<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">📈 Monitoring Capaian Kinerja</h1>
    <!-- Filter Section -->
    <div class="mb-4 flex gap-4 flex-wrap">
      <div>
        <label class="font-bold mb-2 block">Tahun</label>
        <select v-model="selectedTahun" class="select select-bordered w-full">
          <option value="">Semua Tahun</option>
          <option v-for="tahun in tahunList" :key="tahun" :value="tahun">{{ tahun }}</option>
        </select>
      </div>
      <div>
        <label class="font-bold mb-2 block">Satuan Kerja</label>
        <select v-model="selectedSatker" class="select select-bordered w-full">
          <option value="">Semua Satuan Kerja</option>
          <option v-for="satker in satkerList" :key="satker" :value="satker">{{ satker }}</option>
        </select>
      </div>
      <div>
        <label class="font-bold mb-2 block">Status</label>
        <select v-model="selectedStatus" class="select select-bordered w-full">
          <option value="">Semua Status</option>
          <option value="Belum">Belum</option>
          <option value="Proses">Proses</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>
    </div>
    <!-- Table Section -->
    <Card>
      <CardContent>
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered w-full text-left border-collapse">
            <thead class="bg-info text-center">
              <tr class="border-b">
                <th class="p-2">No</th>
                <th class="p-2">Satuan Kerja</th>
                <th class="p-2">Sasaran</th>
                <th class="p-2">Indikator</th>
                <th class="p-2">Target</th>
                <th class="p-2">Realisasi</th>
                <th class="p-2">Capaian (%)</th>
                <th class="p-2">Status</th>
                <th class="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredRows" :key="row.id" class="border-b hover:bg-gray-50">
                <td class="p-2 text-center">{{ idx + 1 }}</td>
                <td class="p-2">{{ row.satker }}</td>
                <td class="p-2">{{ row.sasaran }}</td>
                <td class="p-2">{{ row.indikator }}</td>
                <td class="p-2">{{ row.target }}</td>
                <td class="p-2">{{ row.realisasi }}</td>
                <td class="p-2">
                  <div class="flex items-center gap-2">
                    <div class="w-24 bg-gray-200 rounded-full h-3">
                      <div :style="{ width: row.capaian + '%' }" class="bg-green-500 h-3 rounded-full"></div>
                    </div>
                    <span>{{ row.capaian }}%</span>
                  </div>
                </td>
                <td class="p-2">
                  <span :class="statusClass(row.status)" class="px-2 py-1 rounded text-xs font-bold">{{ row.status }}</span>
                </td>
                <td class="p-2 text-center">
                  <button class="btn btn-sm btn-ghost" @click="editRow(row)">
                    <LucideIcon class="w-5 h-5 text-blue-600" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
    <!-- Modal Edit/Detail (opsional) -->
    <Dialog v-model:open="showModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Monitoring</DialogTitle>
        </DialogHeader>
        <div>
          <div class="mb-2"><b>Satuan Kerja:</b> {{ form.satker }}</div>
          <div class="mb-2"><b>Sasaran:</b> {{ form.sasaran }}</div>
          <div class="mb-2"><b>Indikator:</b> {{ form.indikator }}</div>
          <div class="mb-2"><b>Target:</b> {{ form.target }}</div>
          <div class="mb-2"><b>Realisasi:</b> {{ form.realisasi }}</div>
          <div class="mb-2"><b>Capaian:</b> {{ form.capaian }}%</div>
          <div class="mb-2"><b>Status:</b> <span :class="statusClass(form.status)" class="px-2 py-1 rounded text-xs font-bold">{{ form.status }}</span></div>
        </div>
        <div class="flex justify-end mt-4">
          <Button @click="showModal = false">Tutup</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Card from '~/components/ui/card.vue'
import Dialog from '~/components/ui/dialog.vue'
import Button from '~/components/ui/button.vue'
import { Pencil } from 'lucide-vue-next'

const LucideIcon = Pencil
const tahunList = ref(['2025', '2026', '2027', '2028', '2029'])
const satkerList = ref(['DINAS SOSIAL', 'BADAN PERENCANAAN PEMBANGUNAN DAERAH', 'INSPEKTORAT DAERAH'])
const selectedTahun = ref('')
const selectedSatker = ref('')
const selectedStatus = ref('')
const showModal = ref(false)
const form = ref({})

const rows = ref([
  {
    id: 1,
    tahun: '2025',
    satker: 'DINAS SOSIAL',
    sasaran: 'Meningkatnya Taraf Kesejahteraan Sosial',
    indikator: 'Indeks Kesejahteraan Sosial',
    target: 43.32,
    realisasi: 40.00,
    capaian: 92,
    status: 'Proses'
  },
  {
    id: 2,
    tahun: '2025',
    satker: 'BADAN PERENCANAAN PEMBANGUNAN DAERAH',
    sasaran: 'Kualitas Perencanaan Pembangunan',
    indikator: 'Nilai SAKIP Provinsi',
    target: 25.9,
    realisasi: 25.0,
    capaian: 96,
    status: 'Selesai'
  },
  {
    id: 3,
    tahun: '2026',
    satker: 'INSPEKTORAT DAERAH',
    sasaran: 'Evaluasi Akuntabilitas Internal',
    indikator: 'Nilai SAKIP Evaluasi',
    target: 100,
    realisasi: 80,
    capaian: 80,
    status: 'Belum'
  }
])

const filteredRows = computed(() => {
  return rows.value.filter(row => {
    return (
      (!selectedTahun.value || row.tahun === selectedTahun.value) &&
      (!selectedSatker.value || row.satker === selectedSatker.value) &&
      (!selectedStatus.value || row.status === selectedStatus.value)
    )
  })
})

function statusClass(status) {
  if (status === 'Selesai') return 'bg-green-200 text-green-800'
  if (status === 'Proses') return 'bg-blue-200 text-blue-800'
  if (status === 'Belum') return 'bg-red-200 text-red-800'
  return 'bg-gray-200 text-gray-800'
}

function editRow(row) {
  form.value = { ...row }
  showModal.value = true
}
</script>
