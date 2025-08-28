<template>
  <div class="max-w-6xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">Monitoring Kegiatan Strategis</h1>
    <div class="card bg-base-100 shadow mb-6">
      <div class="card-body">
        <div class="flex gap-4 mb-4">
          <select v-model="filterStatus" class="select select-bordered">
            <option value="">Semua Status</option>
            <option value="Belum Mulai">Belum Mulai</option>
            <option value="On Progress">On Progress</option>
            <option value="Selesai">Selesai</option>
          </select>
          <input v-model="searchNama" type="text" class="input input-bordered" placeholder="Cari nama kegiatan..." />
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered w-full border-collapse">
            <thead class="bg-info text-center">
              <tr>
                <th>Nama Kegiatan</th>
                <th>Unit Kerja</th>
                <th>Ketua Tim</th>
                <th>Anggota</th>
                <th>Progres</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredKegiatan" :key="row.id">
                <td>{{ row.nama }}</td>
                <td>{{ row.unit_kerja }}</td>
                <td>{{ row.ketua }}</td>
                <td>
                  <ul>
                    <li v-for="anggota in row.anggota" :key="anggota">{{ anggota }}</li>
                  </ul>
                </td>
                <td>
                  <progress class="progress progress-info w-32" :value="row.progress" max="100"></progress>
                  <span class="ml-2">{{ row.progress }}%</span>
                </td>
                <td>
                  <span :class="{
                    'badge badge-warning': row.status === 'On Progress',
                    'badge badge-success': row.status === 'Selesai',
                    'badge badge-ghost': row.status === 'Belum Mulai'
                  }">{{ row.status }}</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-info" @click="showDetail(row)">Detail</button>
                </td>
              </tr>
              <tr v-if="filteredKegiatan.length === 0">
                <td colspan="7" class="text-center text-gray-400">Tidak ada kegiatan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Dialog :open="showDetailModal" @close="showDetailModal = false">
      <DialogPanel class="bg-white rounded shadow p-6 w-full max-w-lg mx-auto">
        <h3 class="font-bold mb-2">{{ detailKegiatan.nama }}</h3>
        <div class="mb-2"><strong>Unit Kerja:</strong> {{ detailKegiatan.unit_kerja }}</div>
        <div class="mb-2"><strong>Ketua Tim:</strong> {{ detailKegiatan.ketua }}</div>
        <div class="mb-2"><strong>Anggota:</strong> {{ detailKegiatan.anggota?.join(', ') }}</div>
        <div class="mb-2"><strong>Progress:</strong> {{ detailKegiatan.progress }}%</div>
        <div class="mb-2"><strong>Status:</strong> {{ detailKegiatan.status }}</div>
        <div class="mb-2"><strong>Timeline:</strong> {{ detailKegiatan.timeline }}</div>
        <div class="mb-2"><strong>Target Indikator:</strong> {{ detailKegiatan.target }}</div>
        <div class="mb-2"><strong>Update Terakhir:</strong> {{ detailKegiatan.lastUpdate }}</div>
        <div class="flex justify-end mt-4">
          <button class="btn btn-ghost" @click="showDetailModal = false">Tutup</button>
        </div>
      </DialogPanel>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
const kegiatanList = ref([
  {
    id: 1,
    nama: 'Kegiatan Strategis A',
    unit_kerja: 'DINAS ENERGI DAN SUMBER DAYA MINERAL',
    ketua: 'Budi Santoso',
    anggota: ['Siti Aminah', 'Andi Wijaya'],
    progress: 80,
    status: 'Selesai',
    timeline: 'Jan - Mar 2025',
    target: '100%',
    lastUpdate: '27 Agustus 2025'
  },
  {
    id: 2,
    nama: 'Kegiatan Strategis B',
    unit_kerja: 'INSPEKTORAT DAERAH',
    ketua: 'Siti Aminah',
    anggota: ['Budi Santoso', 'Dewi Lestari'],
    progress: 60,
    status: 'On Progress',
    timeline: 'Feb - Apr 2025',
    target: '80%',
    lastUpdate: '26 Agustus 2025'
  },
  {
    id: 3,
    nama: 'Kegiatan Strategis C',
    unit_kerja: 'DINAS KESEHATAN',
    ketua: 'Andi Wijaya',
    anggota: ['Budi Santoso'],
    progress: 40,
    status: 'On Progress',
    timeline: 'Mar - Mei 2025',
    target: '60%',
    lastUpdate: '25 Agustus 2025'
  }
])
const filterStatus = ref('')
const searchNama = ref('')
const showDetailModal = ref(false)
const detailKegiatan = ref({
  id: 0,
  nama: '',
  unit_kerja: '',
  ketua: '',
  anggota: [],
  progress: 0,
  status: '',
  timeline: '',
  target: '',
  lastUpdate: ''
})
const filteredKegiatan = computed(() => {
  let arr = kegiatanList.value
  if (filterStatus.value) {
    arr = arr.filter(k => k.status === filterStatus.value)
  }
  if (searchNama.value) {
    arr = arr.filter(k => k.nama.toLowerCase().includes(searchNama.value.toLowerCase()))
  }
  return arr
})
function showDetail(row: any) {
  detailKegiatan.value = { ...row }
  showDetailModal.value = true
}
</script>
<style scoped>
.card {
  margin-bottom: 1.5rem;
}
</style>
