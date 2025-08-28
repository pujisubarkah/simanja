<template>
  <div class="p-6 bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-8 text-blue-700 flex items-center gap-2">
      <span>🎯</span> Sasaran Program
    </h1>

    <div v-for="m in misiList" :key="m.id" class="mb-10">
      <!-- Judul misi -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200 shadow">
          <span class="text-2xl">⭐</span>
        </div>
        <h2 class="text-2xl font-bold text-yellow-700">{{ m.deskripsi }}</h2>
      </div>

      <!-- Filter di atas tabel -->
      <div class="mb-4 ml-14 flex gap-2 items-center">
        <input v-model="filterText" placeholder="Filter sasaran/indikator..." class="border rounded p-2 w-96" />
        <button @click="filterText = ''" class="bg-gray-200 px-3 py-1 rounded text-gray-600">Reset</button>
      </div>

      <!-- Tabel Sasaran dan Indikator -->
      <table class="w-full border-collapse mb-8">
        <thead>
          <tr class="bg-blue-200">
            <th class="p-2 border">ID</th>
            <th class="p-2 border">Sasaran</th>
            <th class="p-2 border">Indikator</th>
            <th class="p-2 border">Target</th>
            <th class="p-2 border">Satuan</th>
            <th class="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in filteredSasaran(m.sasaran)" :key="s.id" class="bg-white">
            <td class="border p-2">{{ s.id }}</td>
            <td class="border p-2">{{ s.deskripsi }}</td>
            <td class="border p-2">
              <ul>
                <li v-for="ind in s.indikator" :key="ind.id">{{ ind.deskripsi }}</li>
              </ul>
            </td>
            <td class="border p-2">
              <ul>
                <li v-for="ind in s.indikator" :key="ind.id">{{ ind.target }}</li>
              </ul>
            </td>
            <td class="border p-2">
              <ul>
                <li v-for="ind in s.indikator" :key="ind.id">{{ ind.satuan }}</li>
              </ul>
            </td>
            <td class="border p-2">
              <button @click="editSasaran(s)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button @click="hapusSasaran(s.id)" class="bg-red-500 text-white px-2 py-1 rounded ml-1">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal Edit Sasaran -->
      <div v-if="showEditSasaranModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-grow">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Edit Sasaran</h3>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Deskripsi Sasaran</label>
            <input v-model="editSasaranDraft.deskripsi" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="flex gap-3 mt-4">
            <button @click="submitEditSasaran" class="flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition font-semibold">Simpan</button>
            <button @click="showEditSasaranModal = false" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">Batal</button>
          </div>
        </div>
      </div>

      <!-- Modal Edit Indikator -->
      <div v-if="showEditIndikatorModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-grow">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Edit Indikator</h3>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Deskripsi Indikator</label>
            <input v-model="editIndikatorDraft.deskripsi" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Target</label>
            <input v-model="editIndikatorDraft.target" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Satuan</label>
            <select v-model="editIndikatorDraft.satuan" class="w-full p-2 border rounded-lg">
              <option value="persentase">Persentase</option>
              <option value="orang">Orang</option>
              <option value="laporan">Laporan</option>
              <option value="kebijakan">Kebijakan</option>
              <option value="nilai">Nilai</option>
            </select>
          </div>
          <div class="flex gap-4 mt-4">
            <button @click="submitEditIndikator" class="flex-1 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition font-semibold">Simpan</button>
            <button @click="showEditIndikatorModal = false" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">Batal</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const misiList = ref([])
const tambahSasaranMisiId = ref(null)
const sasaranDraft = ref("")
const indikatorDraft = ref({})
const editSasaranDraft = ref(null)
const showEditSasaranModal = ref(false)
const editIndikatorDraft = ref(null)
const showEditIndikatorModal = ref(false)
const filterText = ref("")

function getIndikatorDraft(sasaranId) {
  if (!indikatorDraft.value[sasaranId]) {
    indikatorDraft.value[sasaranId] = {
      deskripsi: '',
      target: '',
      satuan: 'persentase',
      tw1: '',
      tw2: '',
      tw3: '',
      tw4: ''
    }
  }
  return indikatorDraft.value[sasaranId]
}

async function fetchSasaran() {
  const res = await fetch('/api/sasaran')
  misiList.value = await res.json()
}

onMounted(fetchSasaran)

function showTambahSasaran(misiId) {
  tambahSasaranMisiId.value = misiId
  sasaranDraft.value = ""
}

async function submitTambahSasaran(misiId) {
  if (!sasaranDraft.value.trim()) return
  await fetch('/api/sasaran', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deskripsi: sasaranDraft.value, misi_id: misiId })
  })
  tambahSasaranMisiId.value = null
  sasaranDraft.value = ""
  await fetchSasaran()
}

async function submitTambahIndikator(sasaranId) {
  const draft = getIndikatorDraft(sasaranId)
  if (!draft.deskripsi.trim() || !draft.target.trim()) return
  await fetch('/api/sasaran', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sasaran_id: sasaranId, indikator: draft })
  })
  indikatorDraft.value[sasaranId] = null
  await fetchSasaran()
}

async function hapusIndikator(indikatorId) {
  await fetch(`/api/indikator/${indikatorId}`, {
    method: 'DELETE'
  })
  await fetchSasaran()
}

function editIndikator(ind) {
  editIndikatorDraft.value = { ...ind }
  showEditIndikatorModal.value = true
}

async function submitEditIndikator() {
  const ind = editIndikatorDraft.value
  await fetch(`/api/indikator/${ind.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ind)
  })
  showEditIndikatorModal.value = false
  editIndikatorDraft.value = null
  await fetchSasaran()
}
function hapusSasaran(sasaranId) {
  // Implementasi hapus sasaran ke backend
}
function editSasaran(sasaran) {
  editSasaranDraft.value = { ...sasaran }
  showEditSasaranModal.value = true
}
async function submitEditSasaran() {
  const s = editSasaranDraft.value
  await fetch(`/api/sasaran/${s.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deskripsi: s.deskripsi })
  })
  showEditSasaranModal.value = false
  editSasaranDraft.value = null
  await fetchSasaran()
}

function filteredSasaran(sasaranList) {
  if (!filterText.value) return sasaranList
  const text = filterText.value.toLowerCase()
  return sasaranList.filter(s => {
    if (s.deskripsi && s.deskripsi.toLowerCase().includes(text)) return true
    if (s.indikator && s.indikator.some(ind => ind.deskripsi && ind.deskripsi.toLowerCase().includes(text))) return true
    return false
  })
}
</script>
