<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Master Sasaran Program</h1>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between mb-4">
          <input v-model="search" type="text" class="input input-bordered w-1/3" placeholder="Cari sasaran program..." />
          <button class="btn btn-primary" @click="openModal">Tambah Sasaran Program</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered">
            <thead class="bg-info text-center">
              <tr>
                <th>No</th>
                <th>Nama Sasaran Program</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in filteredList" :key="item.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ item.nama }}</td>
                <td>
                  <button class="btn btn-sm btn-warning mr-2" @click="editItem(item)">Edit</button>
                  <button class="btn btn-sm btn-error" @click="deleteItem(item.id)">Hapus</button>
                </td>
              </tr>
              <tr v-if="filteredList.length === 0">
                <td colspan="3" class="text-center text-gray-400">Tidak ada data sasaran program.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit -->
    <div v-if="isModalOpen" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">{{ editMode ? 'Edit' : 'Tambah' }} Sasaran Program</h3>
        <form @submit.prevent="saveItem">
          <div class="form-control mb-4">
            <label class="label">Nama Sasaran Program</label>
            <input v-model="form.nama" type="text" class="input input-bordered w-full" required />
          </div>
          <div class="modal-action">
            <button type="button" class="btn btn-ghost" @click="closeModal">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
      <div class="modal-backdrop bg-black/50" @click="closeModal"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const list = ref([
  { id: 1, nama: 'Peningkatan Kualitas Pendidikan' },
  { id: 2, nama: 'Penguatan Tata Kelola Pemerintahan' },
])
const search = ref('')
const filteredList = computed(() =>
  list.value.filter(item => item.nama.toLowerCase().includes(search.value.toLowerCase()))
)

const isModalOpen = ref(false)
const editMode = ref(false)
const form = ref({ id: null, nama: '' })

function openModal() {
  isModalOpen.value = true
  editMode.value = false
  form.value = { id: null, nama: '' }
}
function closeModal() {
  isModalOpen.value = false
}
function saveItem() {
  if (editMode.value) {
    const idx = list.value.findIndex(i => i.id === form.value.id)
    if (idx !== -1) list.value[idx].nama = form.value.nama
  } else {
    const newId = list.value.length ? Math.max(...list.value.map(i => i.id)) + 1 : 1
    list.value.push({ id: newId, nama: form.value.nama })
  }
  closeModal()
}
function editItem(item) {
  editMode.value = true
  form.value = { ...item }
  isModalOpen.value = true
}
function deleteItem(id) {
  list.value = list.value.filter(i => i.id !== id)
}
</script>
