<!-- /pages/anggota/[slug]/progress.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">✍️ Input Progres Harian</h1>
    
    <form @submit.prevent="submitProgress" class="bg-white p-6 rounded-xl shadow">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
        <input type="date" v-model="progress.tanggal" class="w-full p-3 border border-gray-300 rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Tugas yang Dikerjakan</label>
        <textarea v-model="progress.tugas" rows="4" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Deskripsikan apa yang sudah dikerjakan hari ini..." required></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Progres (%)</label>
        <input type="number" v-model="progress.progres" class="w-full p-3 border border-gray-300 rounded-lg" min="0" max="100" required />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Kendala (Opsional)</label>
        <textarea v-model="progress.kendala" rows="3" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="Apa yang menghambat?"></textarea>
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
        📤 Kirim Progres
      </button>
    </form>
  </div>
</template>

<script setup>

const progress = ref({
  tanggal: new Date().toISOString().split('T')[0],
  tugas: '',
  progres: 0,
  kendala: ''
})

const submitProgress = () => {
  alert('Progres berhasil dikirim ke ketua tim!')
  // Di sini bisa kirim ke API
}
</script>