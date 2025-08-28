<!-- /pages/anggota/[slug]/self-assessment.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">📝 Self-Assessment Kinerja</h1>
    <div class="bg-white p-6 rounded-xl shadow">
      <p class="mb-6 text-gray-600">Isi penilaian diri Anda untuk periode ini. Ini akan menjadi bahan diskusi dengan atasan.</p>

      <div class="space-y-6">
        <div v-for="kom in kompetensi" :key="kom.id" class="border-b pb-4">
          <label class="block font-medium mb-2">{{ kom.nama }}</label>
          <div class="flex gap-2">
            <button
              v-for="n in 5"
              :key="n"
              @click="nilai[kom.id] = n"
              :class="['w-10 h-10 rounded-full', nilai[kom.id] === n ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <div>
          <label class="block font-medium mb-2">Deskripsi Pencapaian</label>
          <textarea v-model="pencapaian" rows="4" class="w-full p-3 border border-gray-300 rounded-lg"></textarea>
        </div>

        <div>
          <label class="block font-medium mb-2">Kendala yang Dihadapi</label>
          <textarea v-model="kendala" rows="3" class="w-full p-3 border border-gray-300 rounded-lg"></textarea>
        </div>

        <div>
          <label class="block font-medium mb-2">Dukungan yang Dibutuhkan</label>
          <textarea v-model="dukungan" rows="3" class="w-full p-3 border border-gray-300 rounded-lg"></textarea>
        </div>

        <button @click="submitAssessment" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
          📤 Kirim Self-Assessment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const kompetensi = ref([
  { id: 'kerja-sama', nama: 'Kerja Sama Tim' },
  { id: 'produktivitas', nama: 'Produktivitas' },
  { id: 'kualitas', nama: 'Kualitas Kerja' },
  { id: 'inisiatif', nama: 'Inisiatif' },
  { id: 'disiplin', nama: 'Kedisiplinan' }
])

const nilai = ref({})
const pencapaian = ref('')
const kendala = ref('')
const dukungan = ref('')

const submitAssessment = () => {
  alert('Self-assessment berhasil dikirim!')
}
</script>