<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Master Sasaran Kegiatan</h1>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between mb-4">
          <input v-model="search" type="text" class="input input-bordered w-1/3" placeholder="Cari sasaran kegiatan..." />
          <button class="btn btn-primary" @click="openModal">Tambah Sasaran Kegiatan</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered">
            <thead class="bg-info text-center">
              <tr>
                <th>No</th>
                <th>Kode</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Unit ID</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in filteredList" :key="item.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ item.kode_sasaran }}</td>
                <td>{{ item.nama_sasaran }}</td>
                <td>{{ item.deskripsi }}</td>
                <td>{{ item.unit_id }}</td>
                <td>
                  <span :class="item.status ? 'text-success' : 'text-error'">
                    {{ item.status ? 'Aktif' : 'Nonaktif' }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-warning mr-2" @click="editItem(item)">Edit</button>
                  <button class="btn btn-sm btn-error" @click="deleteItem(item.id)">Hapus</button>
                </td>
              </tr>
              <tr v-if="filteredList.length === 0">
                <td colspan="7" class="text-center text-gray-400">Tidak ada data sasaran kegiatan.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Tambah/Edit -->
    <div v-if="isModalOpen" class="modal modal-open">
      <div class="modal-box bg-base-100 shadow-lg w-full max-w-lg relative">
        <h3 class="font-bold text-lg mb-4">{{ editMode ? 'Edit' : 'Tambah' }} Sasaran Kegiatan</h3>
        <form @submit.prevent="saveItem">
          <div class="form-control mb-4">
            <label class="label">Kode Sasaran</label>
            <input v-model="form.kode_sasaran" type="text" class="input input-bordered w-full" required />
          </div>
          <div class="form-control mb-4">
            <label class="label">Nama Sasaran</label>
            <input v-model="form.nama_sasaran" type="text" class="input input-bordered w-full" required />
          </div>
          <div class="form-control mb-4">
            <label class="label">Deskripsi Sasaran Kegiatan</label>
            <input v-model="form.deskripsi" type="text" class="input input-bordered w-full" />
          </div>
          <div class="form-control mb-4">
            <label class="label">Unit ID</label>
            <input v-model.number="form.unit_id" type="number" class="input input-bordered w-full" required />
          </div>
          <div class="form-control mb-4">
            <label class="label">Status</label>
            <select v-model="form.status" class="select select-bordered w-full">
              <option :value="true">Aktif</option>
              <option :value="false">Nonaktif</option>
            </select>
          </div>
          <div class="modal-action flex justify-end gap-2 mt-4">
            <button type="button" class="btn btn-ghost" @click="closeModal">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
        <button class="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" @click="closeModal">✕</button>
      </div>
      <div class="modal-backdrop bg-black/50" @click="closeModal"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const list = ref([])
const search = ref('')
const filteredList = computed(() =>
  list.value.filter(item => {
    const s = search.value.toLowerCase()
    return (
      item.kode_sasaran?.toLowerCase().includes(s) ||
      item.nama_sasaran?.toLowerCase().includes(s) ||
      item.deskripsi?.toLowerCase().includes(s) ||
      String(item.unit_id).includes(s)
    )
  })
)

const isModalOpen = ref(false)
const editMode = ref(false)
const form = ref({
  id: null,
  kode_sasaran: '',
  nama_sasaran: '',
  deskripsi: '',
  unit_id: 1,
  status: true
})

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function fetchList() {
  try {
    const res = await fetch('/api/master-sasaran-kegiatan')
    const result = await res.json()
    if (result.success) {
      list.value = result.data
    }
  } catch (e) {
    console.error('Gagal fetch master sasaran kegiatan', e)
  }
}

onMounted(fetchList)

function openModal() {
  isModalOpen.value = true
  editMode.value = false
  form.value = {
    id: null,
    kode_sasaran: '',
    nama_sasaran: '',
    deskripsi: '',
    unit_id: 1,
    status: true
  }
}
function closeModal() {
  isModalOpen.value = false
}
async function saveItem() {
  const payload = {
    kode_sasaran: form.value.kode_sasaran,
    nama_sasaran: form.value.nama_sasaran,
    deskripsi: form.value.deskripsi,
    unit_id: form.value.unit_id,
    status: form.value.status
  }
  try {
    if (editMode.value) {
      const res = await fetch('/api/master-sasaran-kegiatan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, id: form.value.id })
      })
      const result = await res.json()
      if (result.success) {
        await fetchList()
        closeModal()
      } else {
        alert(result.message || 'Gagal update data')
      }
    } else {
      const res = await fetch('/api/master-sasaran-kegiatan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = await res.json()
      if (result.success) {
        await fetchList()
        closeModal()
      } else {
        alert(result.message || 'Gagal tambah data')
      }
    }
  } catch (e) {
    alert('Gagal simpan data')
    console.error(e)
  }
}
function editItem(item) {
  editMode.value = true
  form.value = { ...item }
  isModalOpen.value = true
}
async function deleteItem(id) {
  if (!confirm('Yakin ingin menghapus data ini?')) return
  try {
    const res = await fetch('/api/master-sasaran-kegiatan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const result = await res.json()
    if (result.success) {
      await fetchList()
    } else {
      alert(result.message || 'Gagal hapus data')
    }
  } catch (e) {
    alert('Gagal hapus data')
    console.error(e)
  }
}
</script>
