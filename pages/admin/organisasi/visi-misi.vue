<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">🎯 Visi & Misi</h1>
    <!-- Visi -->
    <section class="mb-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-gradient-to-r from-blue-400 to-blue-200 rounded-xl shadow-lg p-8 mb-8 flex flex-col items-center relative">
          <h1 class="text-3xl font-bold text-yellow-600 mb-2">Visi</h1>
          <p v-if="!editingVisi" class="text-lg text-blue-900 font-semibold text-center">
            {{ visi }}
          </p>
          <div v-else class="flex flex-col gap-2 w-full">
            <textarea v-model="visiDraft" rows="3" class="border rounded p-2 w-full"></textarea>
            <div class="flex gap-2 justify-center">
              <button @click="simpanVisi" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">💾 Simpan</button>
              <button @click="batalEditVisi" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">❌ Batal</button>
            </div>
          </div>
          <button v-if="!editingVisi" @click="editVisi" class="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">✏️ Edit</button>
        </div>
      </div>
    </section>
    <!-- Misi -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Misi</h2>
      <draggable v-model="misi" item-key="id" class="grid gap-6 md:grid-cols-2 mb-6">
        <template #item="{ element: m, index }">
          <div class="bg-yellow-100 rounded-xl shadow p-6 flex flex-col items-center relative">
            <h2 class="text-xl font-bold text-yellow-700 mb-2">Misi {{ index + 1 }}</h2>
            <div v-if="editingMisi !== index">
              <p class="text-blue-900 text-center">{{ m.deskripsi }}</p>
              <button @click="editMisi(index)" class="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs">✏️ Edit</button>
              <button @click="hapusMisi(index)" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs">❌ Hapus</button>
            </div>
            <div v-else class="w-full flex flex-col gap-2">
              <textarea v-model="misiDraftEdit" rows="2" class="border rounded p-2 w-full"></textarea>
              <div class="flex gap-2 justify-center">
                <button @click="simpanEditMisi(index)" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">💾 Simpan</button>
                <button @click="batalEditMisi" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">❌ Batal</button>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      <!-- Form tambah misi -->
      <div class="bg-white shadow rounded-xl p-4 border max-w-xl">
        <div class="flex gap-2">
          <input v-model="misiDraft" placeholder="Tambahkan misi baru..." class="flex-1 border rounded p-2" />
          <button @click="tambahMisi" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">➕ Tambah</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'

const visi = ref("")
const visiDraft = ref("")
const editingVisi = ref(false)

const misi = ref([])
const misiDraft = ref("")
const editingMisi = ref(null)
const misiDraftEdit = ref("")

onMounted(async () => {
  const res = await fetch('/api/visi')
  const data = await res.json()
  if (Array.isArray(data) && data.length > 0) {
    visi.value = data[0].deskripsi
    visiDraft.value = visi.value
    misi.value = data[0].misi.map(({ id, deskripsi }) => ({ id, deskripsi }))
  }
})

async function editVisi() {
  visiDraft.value = visi.value
  editingVisi.value = true
}
async function simpanVisi() {
  if (visiDraft.value.trim() !== "") {
    // PUT ke /api/visi/[id]
    await fetch(`/api/visi/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deskripsi: visiDraft.value })
    })
    visi.value = visiDraft.value
    editingVisi.value = false
  }
}
function batalEditVisi() {
  editingVisi.value = false
}

function tambahMisi() {
  if (misiDraft.value.trim() !== "") {
    misi.value.push({ id: Date.now(), deskripsi: misiDraft.value })
    misiDraft.value = ""
  }
}
async function hapusMisi(index) {
  const misiId = misi.value[index].id
  // DELETE ke /api/misi/[id] jika endpoint tersedia
  await fetch(`/api/misi/${misiId}`, { method: 'DELETE' })
  misi.value.splice(index, 1)
  if (editingMisi.value === index) batalEditMisi()
}
function editMisi(index) {
  misiDraftEdit.value = misi.value[index].deskripsi
  editingMisi.value = index
}
function simpanEditMisi(index) {
  if (misiDraftEdit.value.trim() !== "") {
    misi.value[index].deskripsi = misiDraftEdit.value
    batalEditMisi()
  }
}
function batalEditMisi() {
  editingMisi.value = null
  misiDraftEdit.value = ""
}
</script>
