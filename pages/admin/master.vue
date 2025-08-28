<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">📋 Master Data</h1>
    <Card>
      <CardContent>
        <table class="table table-zebra table-bordered w-full text-left border-collapse">
          <thead class="bg-info text-center">
            <tr class="border-b">
              <th class="p-2">No</th>
              <th class="p-2">Nama Data</th>
              <th class="p-2">Deskripsi</th>
              <th class="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in masterRows" :key="row.id" class="border-b hover:bg-gray-50">
              <td class="p-2 text-center">{{ idx + 1 }}</td>
              <td class="p-2">{{ row.nama }}</td>
              <td class="p-2">{{ row.deskripsi }}</td>
              <td class="p-2 text-center">
                <button class="btn btn-sm btn-ghost" @click="editRow(row)">
                  <LucideIcon class="w-5 h-5 text-blue-600" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
    <!-- Modal Edit Master Data -->
    <Dialog v-model:open="showModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Master Data</DialogTitle>
        </DialogHeader>
        <form @submit.prevent="simpanMaster">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Nama Data</label>
            <input v-model="form.nama" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Deskripsi</label>
            <input v-model="form.deskripsi" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <Button type="submit">Simpan</Button>
            <Button type="button" variant="outline" @click="showModal = false">Batal</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Dialog from '@/components/ui/dialog.vue'
import Button from '@/components/ui/button.vue'
import { Pencil } from 'lucide-vue-next'

const LucideIcon = Pencil
const showModal = ref(false)
const masterRows = ref([
  { id: 1, nama: 'Unit Kerja', deskripsi: 'Daftar unit kerja organisasi' },
  { id: 2, nama: 'Pegawai', deskripsi: 'Data pegawai dan jabatan' },
  { id: 3, nama: 'Indikator Kinerja', deskripsi: 'Indikator kinerja utama dan tambahan' },
  { id: 4, nama: 'Program', deskripsi: 'Program kerja tahunan' },
  { id: 5, nama: 'Kegiatan', deskripsi: 'Kegiatan operasional dan strategis' }
])
const form = ref({ id: null, nama: '', deskripsi: '' })

function editRow(row) {
  form.value = { ...row }
  showModal.value = true
}
function simpanMaster() {
  const idx = masterRows.value.findIndex(r => r.id === form.value.id)
  if (idx !== -1) {
    masterRows.value[idx] = { ...form.value }
  }
  showModal.value = false
}
</script>
