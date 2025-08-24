<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">📊 Rencana Aksi Pencapaian Indikator Perjanjian Kinerja</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-xl shadow-lg border">
        <thead class="bg-blue-100">
          <tr>
            <th class="px-4 py-2 border">Sasaran</th>
            <th class="px-4 py-2 border">Indikator</th>
            <th class="px-4 py-2 border">Target Perjanjian Kinerja</th>
            <th class="px-4 py-2 border">Satuan</th>
            <th class="px-4 py-2 border" colspan="4">Target Triwulan</th>
            <th class="px-4 py-2 border">Aksi</th>
          </tr>
          <tr class="bg-blue-50">
            <th colspan="4"></th>
            <th class="px-2 py-1 border text-center">I</th>
            <th class="px-2 py-1 border text-center">II</th>
            <th class="px-2 py-1 border text-center">III</th>
            <th class="px-2 py-1 border text-center">IV</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in rows" :key="idx" class="hover:bg-gray-50">
            <td class="px-4 py-2 border">{{ row.sasaran }}</td>
            <td class="px-4 py-2 border">{{ row.indikator }}</td>
            <td class="px-4 py-2 border">{{ row.target }}</td>
            <td class="px-4 py-2 border">{{ row.satuan }}</td>
            <td class="px-2 py-2 border text-center">{{ row.triwulan.I }}</td>
            <td class="px-2 py-2 border text-center">{{ row.triwulan.II }}</td>
            <td class="px-2 py-2 border text-center">{{ row.triwulan.III }}</td>
            <td class="px-2 py-2 border text-center">{{ row.triwulan.IV }}</td>
            <td class="px-4 py-2 border text-center">
              <button @click="editRencana(idx)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center justify-center gap-1">
                <LucideIcon name="Pencil" size="18" class="mr-1" /> Ubah
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal Input Rencana Aksi -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-grow">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Input Rencana Aksi Perjanjian Kinerja</h3>
        <div class="mb-4">
          <label class="block font-semibold mb-1">Sasaran</label>
          <input v-model="form.sasaran" class="w-full p-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block font-semibold mb-1">Indikator</label>
          <input v-model="form.indikator" class="w-full p-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block font-semibold mb-1">Target Perjanjian Kinerja</label>
          <input v-model="form.target" class="w-full p-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block font-semibold mb-1">Satuan</label>
          <input v-model="form.satuan" class="w-full p-2 border rounded-lg" />
        </div>
        <div class="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold mb-1">Target Triwulan I</label>
            <input v-model="form.triwulan.I" class="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Target Triwulan II</label>
            <input v-model="form.triwulan.II" class="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Target Triwulan III</label>
            <input v-model="form.triwulan.III" class="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Target Triwulan IV</label>
            <input v-model="form.triwulan.IV" class="w-full p-2 border rounded-lg" />
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <button @click="simpanRencana" class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold">Simpan</button>
          <button @click="showModal = false" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Pencil } from 'lucide-vue-next'

const LucideIcon = Pencil
const rows = ref([])
const showModal = ref(false)
const form = ref({
  id: '',
  sasaran: '',
  indikator: '',
  target: '',
  satuan: '',
  triwulan: { I: '', II: '', III: '', IV: '' }
})

async function fetchIndikator() {
  const res = await fetch('/api/indikator')
  const data = await res.json()
  rows.value = data.map(item => ({
    id: item.id,
    sasaran: item.sasaran?.deskripsi || '',
    indikator: item.deskripsi,
    target: item.target,
    satuan: item.satuan,
    triwulan: {
      I: item.tw1 ?? '',
      II: item.tw2 ?? '',
      III: item.tw3 ?? '',
      IV: item.tw4 ?? ''
    }
  }))
}

onMounted(fetchIndikator)

function editRencana(idx) {
  const r = rows.value[idx]
  form.value = {
    id: r.id,
    sasaran: r.sasaran,
    indikator: r.indikator,
    target: r.target,
    satuan: r.satuan,
    triwulan: { ...r.triwulan }
  }
  showModal.value = true
}
function simpanRencana() {
  // Simpan perubahan ke rows (dummy, bisa dihubungkan ke API)
  const idx = rows.value.findIndex(r => r.id === form.value.id)
  if (idx !== -1) {
    rows.value[idx] = JSON.parse(JSON.stringify(form.value))
  }
  showModal.value = false
}
</script>
