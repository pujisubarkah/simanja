<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">👤 Manajemen User & Role</h1>
      <Button @click="openAddUser">+ Tambah User</Button>
    </div>
    <Card>
      <CardContent>
        <table class="table table-zebra table-bordered w-full text-left border-collapse">
          <thead class="bg-info text-center">
            <tr class="border-b">
              <th class="p-2">No</th>
              <th class="p-2">Nama</th>
              <th class="p-2">Email</th>
              <th class="p-2">Role</th>
              <th class="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, idx) in users" :key="user.id" class="border-b hover:bg-gray-50">
              <td class="p-2 text-center">{{ idx + 1 }}</td>
              <td class="p-2">{{ user.nama }}</td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">
                <select v-model="user.role" class="select select-bordered select-sm">
                  <option v-for="r in roleOptions" :key="r" :value="r">{{ r }}</option>
                </select>
              </td>
              <td class="p-2 text-center">
                <button class="btn btn-sm btn-ghost" @click="editUser(user)">
                  <LucideIcon class="w-5 h-5 text-blue-600" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
    <!-- Modal Edit/Tambah User -->
    <Dialog v-model:open="showModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User & Role</DialogTitle>
        </DialogHeader>
        <form @submit.prevent="simpanUser">
          <div class="mb-4">
            <label class="block font-semibold mb-1">Nama</label>
            <input v-model="form.nama" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Email</label>
            <input v-model="form.email" class="w-full p-2 border rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block font-semibold mb-1">Role</label>
            <select v-model="form.role" class="select select-bordered w-full">
              <option v-for="r in roleOptions" :key="r" :value="r">{{ r }}</option>
            </select>
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
const roleOptions = ['Admin', 'Ketua', 'Pegawai', 'Viewer']
const users = ref([
  { id: 1, nama: 'Admin Simanja', email: 'admin@simanja.com', role: 'Admin' },
  { id: 2, nama: 'Ketua Unit', email: 'ketua@simanja.com', role: 'Ketua' },
  { id: 3, nama: 'Pegawai A', email: 'pegawai.a@simanja.com', role: 'Pegawai' },
  { id: 4, nama: 'Viewer', email: 'viewer@simanja.com', role: 'Viewer' }
])
const form = ref({ id: null, nama: '', email: '', role: '' })

function editUser(user) {
  form.value = { ...user }
  showModal.value = true
}
function simpanUser() {
  const idx = users.value.findIndex(u => u.id === form.value.id)
  if (idx !== -1) {
    users.value[idx] = { ...form.value }
  }
  showModal.value = false
}
</script>
