<!-- /pages/anggota/[slug]/penilaian.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">🌟 Penilaian dari Atasan</h1>
    <div class="bg-white p-6 rounded-xl shadow">
      <div class="text-center py-8">
        <div class="text-6xl mb-4">⭐</div>
        <div class="text-2xl font-bold text-green-600 mb-2">88 / 100</div>
        <div class="text-gray-600">Kinerja Anda sangat baik!</div>
      </div>

      <div class="mt-6 space-y-4">
        <div v-for="kom in hasilPenilaian" :key="kom.id" class="p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between">
            <strong>{{ kom.nama }}</strong>
            <span :class="textColor(kom.skor)">{{ kom.skor }}/5</span>
          </div>
          <div class="text-sm text-gray-600 mt-1">{{ kom.feedback }}</div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-blue-50 rounded-lg">
        <strong>Feedback Umum:</strong>
        <p class="mt-1">"Kinerja sangat baik, terutama di aspek produktivitas dan kualitas kerja. Terus pertahankan!"</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'anggota' })
const hasilPenilaian = ref([
  { id: 'kerja-sama', nama: 'Kerja Sama Tim', skor: 4, feedback: 'Sering membantu rekan kerja.' },
  { id: 'produktivitas', nama: 'Produktivitas', skor: 5, feedback: 'Target selalu tercapai tepat waktu.' },
  { id: 'kualitas', nama: 'Kualitas Kerja', skor: 5, feedback: 'Hasil kerja sangat rapi dan akurat.' },
  { id: 'inisiatif', nama: 'Inisiatif', skor: 4, feedback: 'Mulai aktif memberi masukan.' },
  { id: 'disiplin', nama: 'Kedisiplinan', skor: 3, feedback: 'Ada 1 keterlambatan minggu lalu.' }
])

const textColor = (skor) => {
  if (skor >= 4) return 'text-green-600'
  if (skor >= 3) return 'text-yellow-600'
  return 'text-red-600'
}
</script>