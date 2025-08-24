<template>
  <header class="w-full shadow flex items-center justify-between px-8 py-4" style="background: linear-gradient(90deg, #1976D2 0%, #C2E7F6 100%); border-bottom: 2px solid #FFD700;">
    <div class="flex items-center gap-3">
      <img src="/berakhlak.png" alt="BerAKHLAK" class="h-8 w-auto object-contain" />
      <img src="/lanri_.png" alt="LAN RI" class="h-8 w-auto object-contain" />
      <span class="text-2xl font-bold tracking-wide" style="color: #FFD700; text-shadow: 0 2px 8px #1976D2;">Sistem Informasi Manajemen Kinerja</span>
    </div>
    <div class="flex items-center gap-4">
      <!-- Icon Bell Notifikasi -->
      <button class="relative focus:outline-none" aria-label="Notifikasi">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <!-- Badge notifikasi (dummy) -->
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <!-- Dropdown User -->
      <div class="relative" ref="dropdownRef">
        <button @click="toggleDropdown" class="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full shadow hover:bg-yellow-200 transition">
          <span class="font-bold text-yellow-700">{{ userName }}</span>
          <span class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{{ userName.charAt(0) }}</span>
          <svg class="w-4 h-4 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        <transition name="fade">
          <div v-if="showDropdown" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
            <button @click="showEditPassword = true; showDropdown = false" class="w-full text-left px-5 py-3 hover:bg-blue-50 text-gray-700 font-semibold flex items-center gap-2">
              <span>🔒 Ganti Sandi</span>
            </button>
            <button @click="logout" class="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2">
              <span>🚪 Logout</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- Modal Edit Nama dihapus -->
    <!-- Modal Edit Sandi -->
    <div v-if="showEditPassword" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-grow">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Ganti Sandi</h3>
        <input v-model="oldPassword" type="password" placeholder="Sandi Lama" class="w-full p-3 border border-gray-300 rounded-lg mb-3" />
        <input v-model="newPassword" type="password" placeholder="Sandi Baru" class="w-full p-3 border border-gray-300 rounded-lg mb-4" />
        <div class="flex gap-3">
          <button @click="savePassword" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">Simpan</button>
          <button @click="showEditPassword = false" class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">Batal</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const showDropdown = ref(false)
const showEditPassword = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const userName = computed(() => userStore.user?.nama_lengkap || 'User')
const dropdownRef = ref(null)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const logout = () => {
  userStore.setUser(null)
  window.location.href = '/'
}

const savePassword = async () => {
  // Implementasi ganti password, misal POST ke /api/users
  // ...
  showEditPassword.value = false
  oldPassword.value = ''
  newPassword.value = ''
  alert('Password berhasil diganti!')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
