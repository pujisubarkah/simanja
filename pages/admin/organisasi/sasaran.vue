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

      <!-- Jika belum ada sasaran -->
      <div v-if="!m.sasaran || m.sasaran.length === 0" class="ml-14 mb-6">
        <button @click="showTambahSasaran(m.id)" class="bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700 transition">➕ Tambah Sasaran</button>
      </div>

      <!-- Daftar sasaran -->
      <div v-for="s in m.sasaran" :key="s.id" class="bg-gradient-to-r from-blue-200 to-blue-100 rounded-2xl shadow-lg p-6 mb-4 relative transition-transform hover:-translate-y-1 hover:shadow-xl">
        <span class="absolute top-2 left-2 text-blue-500 text-lg">↕️</span>
        <p class="text-blue-900 font-extrabold text-xl mb-2 flex items-center gap-3">
          <span class="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-yellow-800 font-bold shadow">
            {{ s.id }}
          </span>
          <span class="inline-flex items-center gap-2">
            <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-bold shadow">Sasaran</span>
            <span class="text-blue-900 font-extrabold text-xl">{{ s.deskripsi }}</span>
          </span>
        </p>
        <div class="flex gap-2 mt-2 justify-end">
          <button @click="editSasaran(s)" class="bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600 transition">✏️ Edit</button>
          <button @click="hapusSasaran(s.id)" class="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition">❌ Hapus</button>
        </div>

        <!-- Indikator -->
        <div class="mt-2 ml-8">
          <span class="font-semibold text-blue-700">Indikator:</span>
          <ul class="text-blue-600 p-0 m-0">
            <li v-for="ind in s.indikator" :key="ind.id" class="flex items-center gap-2 mb-1 pl-0" style="list-style:none;">
              <span class="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              <span>{{ ind.deskripsi }}</span>
              <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Target: {{ ind.target }}</span>
              <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-bold">Satuan: {{ ind.satuan }}</span>
              <button @click="editIndikator(ind)" class="bg-yellow-500 text-white px-2 py-1 rounded text-xs ml-2 hover:bg-yellow-600">Edit</button>
              <button @click="hapusIndikator(ind.id)" class="bg-red-500 text-white px-2 py-1 rounded text-xs ml-1 hover:bg-red-600">Hapus</button>
            </li>
          </ul>
          <div class="flex gap-2 mt-2">
            <input v-model="getIndikatorDraft(s.id).deskripsi" placeholder="Tambah indikator..." class="border rounded p-2 flex-1" />
            <input v-model="getIndikatorDraft(s.id).target" placeholder="Target..." class="border rounded p-2 w-24" />
            <select v-model="getIndikatorDraft(s.id).satuan" class="border rounded p-2 w-32">
              <option value="persentase">Persentase</option>
              <option value="orang">Orang</option>
              <option value="laporan">Laporan</option>
              <option value="kebijakan">Kebijakan</option>
              <option value="program">Nilai</option>
            </select>
            <button @click="submitTambahIndikator(s.id)" class="bg-blue-500 text-white px-3 py-1 rounded">➕</button>
          </div>
        </div>
      </div>

      <!-- Modal/slot tambah sasaran (dummy, bisa dikembangkan) -->
      <div v-if="tambahSasaranMisiId === m.id" class="ml-14 mt-2">
        <input v-model="sasaranDraft" placeholder="Deskripsi sasaran..." class="border rounded-xl p-3 shadow w-96" />
        <button @click="submitTambahSasaran(m.id)" class="bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700 transition ml-2">Simpan</button>
        <button @click="tambahSasaranMisiId = null" class="ml-2 text-gray-500">Batal</button>
      </div>
    </div>

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
</script>
