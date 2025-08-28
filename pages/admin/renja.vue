<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">📋 Rencana Kerja (Renja)</h1>
      <Button @click="openForm()">+ Tambah Renja</Button>
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

    <!-- Table Renja -->
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
                <th class="p-2">Program</th>
                <th class="p-2">Kegiatan</th>
                <th class="p-2">Anggaran</th>
                <th class="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredRenja" :key="row.id" class="border-b hover:bg-gray-50">
                <td class="p-2 text-center">{{ idx + 1 }}</td>
                <td class="p-2">{{ row.satker }}</td>
                <td class="p-2">{{ row.sasaran }}</td>
                <td class="p-2">{{ row.indikator }}</td>
                <td class="p-2">{{ row.target }}</td>
                <td class="p-2">{{ row.program }}</td>
                <td class="p-2">{{ row.kegiatan }}</td>
                <td class="p-2">Rp {{ row.anggaran.toLocaleString() }}</td>
                <td class="p-2">
                  <button class="btn btn-sm btn-ghost" @click="edit(row)">
                    <LucideEdit class="w-5 h-5 text-blue-600" />
                  </button>
                  <button class="btn btn-sm btn-ghost" @click="hapus(row.id)">
                    <LucideTrash class="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>

    <!-- Pagination (dummy) -->
    <div class="mt-4 flex justify-center">
      <button class="btn btn-sm btn-outline mx-1">«</button>
      <button class="btn btn-sm btn-info mx-1">1</button>
      <button class="btn btn-sm btn-outline mx-1">2</button>
      <button class="btn btn-sm btn-outline mx-1">3</button>
      <button class="btn btn-sm btn-outline mx-1">»</button>
    </div>

    <!-- Modal Form -->
    <Dialog v-model:open="showForm">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ form.id ? 'Edit Renja' : 'Tambah Renja' }}</DialogTitle>
        </DialogHeader>

        <form @submit.prevent="simpan">
          <div class="space-y-4">
            <div>
              <label class="block mb-1">Tahun</label>
              <input v-model="form.tahun" type="number" class="border p-2 w-full rounded" />
            </div>
            <div>
              <label class="block mb-1">Program</label>
              <input v-model="form.program" type="text" class="border p-2 w-full rounded" />
            </div>
            <div>
              <label class="block mb-1">Kegiatan</label>
              <input v-model="form.kegiatan" type="text" class="border p-2 w-full rounded" />
            </div>
            <div>
              <label class="block mb-1">Anggaran</label>
              <input v-model="form.anggaran" type="number" class="border p-2 w-full rounded" />
            </div>
            <div>
              <label class="block mb-1">Output</label>
              <input v-model="form.output" type="text" class="border p-2 w-full rounded" />
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import Button from '~/components/ui/button.vue'
import Card from '~/components/ui/card.vue'
import Dialog from '~/components/ui/dialog.vue'
import { Edit as LucideEdit, Trash as LucideTrash } from 'lucide-vue-next'

const satkerList = ref(['SEKRETARIAT DPRD', 'SATKER LAIN'])
const selectedSatker = ref('')
const renjaData = ref([
  { id: 1, tahun: 2025, program: "Program A", kegiatan: "Kegiatan A1", anggaran: 100000000, output: "Dokumen A", satker: "SEKRETARIAT DPRD", sasaran: "Sasaran A", indikator: "Indikator A", target: "Target A", subKegiatan: "Sub Kegiatan A1" },
  { id: 2, tahun: 2025, program: "Program B", kegiatan: "Kegiatan B1", anggaran: 50000000, output: "Laporan B", satker: "SATKER LAIN", sasaran: "Sasaran B", indikator: "Indikator B", target: "Target B", subKegiatan: "Sub Kegiatan B1" },
])

const showForm = ref(false)
const form = ref({ id: null, tahun: "", program: "", kegiatan: "", anggaran: 0, output: "" })

function openForm() {
  form.value = { id: null, tahun: "", program: "", kegiatan: "", anggaran: 0, output: "" }
  showForm.value = true
}

function edit(item) {
  form.value = { ...item }
  showForm.value = true
}

function hapus(id) {
  renja.value = renja.value.filter(r => r.id !== id)
}

function simpan() {
  if (form.value.id) {
    // update
    const idx = renja.value.findIndex(r => r.id === form.value.id)
    if (idx !== -1) renja.value[idx] = { ...form.value }
  } else {
    // tambah baru
    form.value.id = Date.now()
    renja.value.push({ ...form.value })
  }
  showForm.value = false
}

const filteredRenja = computed(() =>
  selectedSatker.value
    ? renjaData.value.filter(r => r.satker === selectedSatker.value)
    : renjaData.value
)
</script>
