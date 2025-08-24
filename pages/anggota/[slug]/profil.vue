<!-- /pages/anggota/[slug]/profil.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900">
          👤 Profil Saya
        </h1>
        <p class="text-gray-600">Kelola informasi pribadi Anda di sistem kinerja.</p>
      </div>

      <!-- Kartu Profil -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <!-- Header Biru -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 h-24"></div>

        <!-- Isi Profil -->
        <div class="px-6 pb-6 relative -mt-12">
          <!-- Foto Profil -->
          <div class="flex justify-center mb-4">
            <div class="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              <template v-if="profil?.photo_url">
                <img :src="profil.photo_url" alt="Foto Profil" class="w-full h-full object-cover" />
              </template>
              <template v-else>
                {{ profil?.nama?.charAt(0) || '-' }}
              </template>
            </div>
          </div>

          <!-- Nama & NIP -->
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ profil?.nama || '-' }}</h2>
            <p class="text-gray-600">NIP: {{ profil?.nip || '-' }}</p>
          </div>

          <!-- Tombol Edit Profil -->
          <button @click="showEdit = true" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            🛠️ Edit Profil
          </button>
      <!-- Modal Edit Profil -->
      <div v-if="showEdit" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-grow">
          <h3 class="text-xl font-bold text-gray-800 mb-6">Edit Profil</h3>
          <form @submit.prevent="saveEdit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input v-model="editData.nama" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NIP</label>
              <input v-model="editData.nip" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <input v-model="editData.jabatan" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Unit Kerja</label>
              <input v-model="editData.unit" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tim</label>
              <input v-model="editData.tim" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Atasan Langsung</label>
              <input v-model="editData.atasan" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="editData.email" type="email" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
              <input v-model="editData.hp" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div class="flex gap-3 pt-4">
              <button type="submit" class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">Simpan</button>
              <button type="button" @click="showEdit = false" class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">Batal</button>
            </div>
          </form>
        </div>
      </div>
        </div>

        <!-- Detail Informasi -->
        <div class="p-6 border-t border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📄 Informasi Pribadi
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <div class="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium">{{ profil?.nama || '-' }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NIP</label>
              <div class="p-3 bg-gray-50 rounded-lg text-gray-800">{{ profil?.nip || '-' }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <div class="p-3 bg-gray-50 rounded-lg text-gray-800">{{ profil?.jabatan || '-' }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Unit Kerja</label>
              <div class="p-3 bg-gray-50 rounded-lg text-gray-800">{{ profil?.unit_kerja?.nama || '-' }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tim</label>
              <div class="p-3 bg-gray-50 rounded-lg text-gray-800">{{ profil?.tim || '-' }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Atasan Langsung</label>
              <div class="p-3 bg-gray-50 rounded-lg text-gray-800">{{ profil?.nama_atasan || '-' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kontak -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📞 Kontak
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <div class="p-3 bg-gray-50 rounded-lg text-blue-700 font-medium">{{ profil?.email || '-' }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nomor HP</label>
            <div class="p-3 bg-gray-50 rounded-lg text-gray-800">{{ profil?.hp || '-' }}</div>
          </div>
        </div>
      </div>

      <!-- Riwayat (Opsional) -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📚 Riwayat Jabatan & Pelatihan
        </h3>
        <div class="space-y-4">
          <div v-for="item in riwayat" :key="item.id" class="border-l-4 pl-4" :class="borderColor(item.jenis)">
            <div class="font-medium text-gray-800">{{ item.nama }}</div>
            <div class="text-sm text-gray-600">{{ item.periode }}</div>
            <div class="text-sm text-gray-500">{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'anggota' })
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const slug = route.params.slug
const userStore = useUserStore()

const showEdit = ref(false)
const editData = ref({
  nama: '',
  nip: '',
  jabatan: '',
  unit: '',
  tim: '',
  atasan: '',
  email: '',
  hp: ''
})

const saveEdit = () => {
  // Update profil.value dengan editData
  if (profil.value) {
  profil.value.nama = editData.value.nama
    profil.value.nip = editData.value.nip
    profil.value.jabatan = editData.value.jabatan
    profil.value.unit_kerja = { ...profil.value.unit_kerja, nama: editData.value.unit }
    profil.value.tim = editData.value.tim
    profil.value.atasan_nama = editData.value.atasan
    profil.value.email = editData.value.email
    profil.value.hp = editData.value.hp
  }
  showEdit.value = false
  alert('Profil berhasil diperbarui!')
}

// Riwayat
const riwayat = ref([
  {
    id: 1,
    nama: 'Pelatihan Manajemen Waktu',
    periode: 'Mar 2024',
    unit: 'Pusat Pelatihan SDM',
    jenis: 'pelatihan'
  },
  {
    id: 2,
    nama: 'Staff Keuangan',
    periode: '2018 - 2022',
    unit: 'Unit Keuangan',
    jenis: 'jabatan'
  },
  {
    id: 3,
    nama: 'Penghargaan Pegawai Teladan',
    periode: '2023',
    unit: 'Biro Umum',
    jenis: 'penghargaan'
  }
])

// Warna border berdasarkan jenis
const borderColor = (jenis) => {
  if (jenis === 'pelatihan') return 'border-blue-500'
  if (jenis === 'jabatan') return 'border-green-500'
  if (jenis === 'penghargaan') return 'border-yellow-500'
  return 'border-gray-500'
}

// Fetch data profil
const profil = ref(null)

onMounted(async () => {
  if (userStore.user?.id) {
    const res = await fetch(`/api/pegawai/${userStore.user.id}`)
    profil.value = await res.json()
    // Isi editData dengan data dari profil
    editData.value = {
  nama: profil.value.nama || '',
      nip: profil.value.nip || '',
      jabatan: profil.value.jabatan || '',
      unit: profil.value.unit_kerja?.nama || '',
      tim: profil.value.tim || '',
      atasan: profil.value.atasan_nama || '',
      email: profil.value.email || '',
      hp: profil.value.hp || ''
    }
  }
})
</script>