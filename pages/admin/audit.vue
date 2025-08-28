<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">📝 Audit Trail</h1>
    <Card>
      <CardContent>
        <table class="table table-zebra table-bordered w-full text-left border-collapse">
          <thead class="bg-info text-center">
            <tr class="border-b">
              <th class="p-2">No</th>
              <th class="p-2">User</th>
              <th class="p-2">Aksi</th>
              <th class="p-2">Deskripsi</th>
              <th class="p-2">Waktu</th>
              <th class="p-2">IP Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in auditRows" :key="row.id" class="border-b hover:bg-gray-50">
              <td class="p-2 text-center">{{ idx + 1 }}</td>
              <td class="p-2">{{ row.user }}</td>
              <td class="p-2">{{ row.aksi }}</td>
              <td class="p-2">{{ row.deskripsi }}</td>
              <td class="p-2">{{ row.waktu }}</td>
              <td class="p-2">{{ row.ip }}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'

const auditRows = ref([
  { id: 1, user: 'Admin Simanja', aksi: 'Login', deskripsi: 'Berhasil login ke sistem', waktu: '2025-08-28 08:12', ip: '192.168.1.10' },
  { id: 2, user: 'Ketua Unit', aksi: 'Edit Renja', deskripsi: 'Mengubah target kegiatan', waktu: '2025-08-28 09:05', ip: '192.168.1.11' },
  { id: 3, user: 'Pegawai A', aksi: 'Upload Dokumen', deskripsi: 'Menambah dokumen PK', waktu: '2025-08-28 10:22', ip: '192.168.1.12' },
  { id: 4, user: 'Admin Simanja', aksi: 'Hapus User', deskripsi: 'Menghapus user Viewer', waktu: '2025-08-28 11:00', ip: '192.168.1.10' }
])
</script>
