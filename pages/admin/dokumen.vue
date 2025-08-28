<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">🗂️ Manajemen Dokumen</h1>
      <Button @click="openUpload = true">+ Tambah Link Dokumen</Button>
    </div>

    <!-- Filter -->
    <div class="flex gap-4 mb-4">
      <select v-model="kategori" class="border p-2 rounded">
        <option value="">Semua Kategori</option>
        <option v-for="k in kategoriOptions" :key="k">{{ k }}</option>
      </select>
      <select v-model="tahun" class="border p-2 rounded">
        <option value="">Semua Tahun</option>
        <option v-for="t in tahunOptions" :key="t">{{ t }}</option>
      </select>
    </div>

    <!-- Tabel Dokumen -->
    <Card>
      <CardContent>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="p-2">Nama Dokumen</th>
              <th class="p-2">Kategori</th>
              <th class="p-2">Tahun</th>
              <th class="p-2">Versi</th>
              <th class="p-2">Upload By</th>
              <th class="p-2">Tanggal</th>
              <th class="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doc in filteredDocs" :key="doc.id" class="border-b hover:bg-gray-50">
              <td class="p-2">{{ doc.nama }}</td>
              <td class="p-2">{{ doc.kategori }}</td>
              <td class="p-2">{{ doc.tahun }}</td>
              <td class="p-2">v{{ doc.versi }}</td>
              <td class="p-2">{{ doc.uploader }}</td>
              <td class="p-2">{{ doc.tanggal }}</td>
              <td class="p-2 flex gap-2">
                <a :href="doc.url" target="_blank">
                  <Button size="sm">🔗 Lihat</Button>
                </a>
                <Button size="sm" variant="destructive" @click="hapus(doc)">🗑️</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>

    <!-- Modal Tambah Link -->
    <div v-if="openUpload" class="fixed inset-0 bg-black/50 flex justify-center items-center">
      <Card class="w-1/3 p-6">
        <h2 class="text-lg font-bold mb-4">Tambah Link Dokumen</h2>
        <form @submit.prevent="handleUpload">
          <input v-model="form.nama" placeholder="Nama Dokumen" class="border p-2 rounded w-full mb-3" />
          <select v-model="form.kategori" class="border p-2 rounded w-full mb-3">
            <option value="">Pilih Kategori</option>
            <option v-for="k in kategoriOptions" :key="k">{{ k }}</option>
          </select>
          <select v-model="form.tahun" class="border p-2 rounded w-full mb-3">
            <option v-for="t in tahunOptions" :key="t">{{ t }}</option>
          </select>
          <input v-model="form.url" placeholder="Link Google Drive" class="border p-2 rounded w-full mb-3" />
          <div class="flex justify-end gap-2">
            <Button type="button" variant="outline" @click="openUpload = false">Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Button from '@/components/ui/button.vue'

const openUpload = ref(false)
const kategori = ref("")
const tahun = ref("")

const kategoriOptions = ["Renstra", "Renja", "PK", "Rencana Aksi", "Laporan", "Lainnya"]
const tahunOptions = [2023, 2024, 2025, 2026]

const docs = ref([
  { id: 1, nama: "Renstra 2025", kategori: "Renstra", tahun: 2025, versi: 1, url: "https://drive.google.com/abc123", uploader: "Admin", tanggal: "2025-01-12" },
  { id: 2, nama: "PK Unit A", kategori: "PK", tahun: 2025, versi: 2, url: "https://drive.google.com/xyz456", uploader: "Admin", tanggal: "2025-02-05" },
])

const filteredDocs = computed(() => {
  return docs.value.filter(d =>
    (kategori.value ? d.kategori === kategori.value : true) &&
    (tahun.value ? d.tahun == tahun.value : true)
  )
})

// Upload dummy
const form = ref({ nama: "", kategori: "", tahun: 2025, url: "" })
function handleUpload() {
  docs.value.push({
    id: docs.value.length + 1,
    ...form.value,
    versi: 1,
    uploader: "Admin",
    tanggal: new Date().toISOString().split("T")[0]
  })
  openUpload.value = false
}
function hapus(doc) {
  docs.value = docs.value.filter(d => d.id !== doc.id)
}
</script>
