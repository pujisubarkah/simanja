<!-- /pages/ketua-tim/[timSlug]/evaluasi.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-400 via-blue-200 to-green-200 p-6 rounded-xl shadow-xl mb-6 flex items-center gap-4">
        <button @click="router.back()" class="text-white hover:text-yellow-300 text-2xl font-bold bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition">
          ←
        </button>
        <div>
          <h1 class="text-3xl font-extrabold text-white drop-shadow">✍️ Evaluasi Kinerja</h1>
          <p class="text-blue-100">Berikan penilaian untuk anggota tim Anda</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white p-12 rounded-xl shadow text-center">
        <div class="text-6xl mb-4">🔄</div>
        <p class="text-gray-500">Memuat data anggota...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl shadow text-center">
        <div class="text-4xl mb-2">❌</div>
        <p>{{ error }}</p>
      </div>

      <!-- Form Evaluasi -->
      <div v-else class="bg-white p-8 rounded-2xl shadow-xl">
        <!-- Info Anggota -->
        <div class="mb-8 flex items-center gap-4 bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-xl border border-blue-100 shadow">
          <div class="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {{ selectedMember.nama.charAt(0) }}
          </div>
          <div>
            <div class="font-extrabold text-blue-800 text-lg">{{ selectedMember.nama }}</div>
            <div class="text-gray-600 text-sm">{{ selectedMember.peran }}</div>
          </div>
        </div>

        <!-- Penilaian Kompetensi -->
        <div class="space-y-6 mb-8">
          <h3 class="font-bold text-gray-800 border-b pb-2 text-lg">Penilaian Kompetensi</h3>
          <div v-for="kom in kompetensi" :key="kom.id" class="py-2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              {{ kom.nama }}
            </label>
            <div class="flex gap-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="nilai[kom.id] = n"
                :class="[
                  'w-10 h-10 rounded-full text-base font-bold transition-all duration-200 border-2',
                  nilai[kom.id] === n 
                    ? kom.warna + ' text-white shadow-lg border-yellow-300 scale-110' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-200'
                ]"
              >
                {{ n }}
              </button>
              <span class="ml-4 text-sm px-2 py-1 rounded-full font-semibold"
                :class="nilai[kom.id] ? kom.warna + ' text-white' : 'bg-gray-200 text-gray-500'">
                {{ getLabel(kom.id, nilai[kom.id]) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Feedback -->
        <div class="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            💬 Feedback Konstruktif
          </label>
          <textarea
            v-model="feedback"
            rows="5"
            class="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
            placeholder="Tuliskan apresiasi, saran perbaikan, atau rekomendasi pengembangan..."
          ></textarea>
        </div>

        <!-- Rata-rata Otomatis -->
        <div v-if="rataRata" class="mb-8 p-4 bg-green-50 rounded-xl border border-green-200 shadow">
          <div class="text-base text-green-700 font-semibold">
            Rata-rata kinerja: <strong>{{ rataRata }}/5 ({{ Math.round(rataRata * 20) }}%)</strong>
          </div>
        </div>

        <!-- Aksi -->
        <div class="flex gap-4 pt-4 border-t">
          <button
            @click="simpanEvaluasi"
            :disabled="submitting"
            class="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-blue-400 transition font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <span v-if="submitting">Menyimpan...</span>
            <span v-else>✅ Simpan Evaluasi</span>
          </button>
          <button
            @click="batal"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition font-semibold shadow"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

// Ambil slug
const timSlug = route.params.timSlug
const anggotaSlug = route.query.anggota

// State
const loading = ref(true)
const error = ref('')
const submitting = ref(false)

const selectedMember = ref(null)
const feedback = ref('')
const nilai = ref({})

// Data dummy anggota (nanti dari API)
const anggotaTim = ref([
  { id: 1, nama: 'Andi Prasetyo', peran: 'Staff Marketing', slug: 'andi' },
  { id: 2, nama: 'Budi Santoso', peran: 'Desainer Grafis', slug: 'budi' },
  { id: 3, nama: 'Citra Dewi', peran: 'Content Writer', slug: 'citra' },
  { id: 4, nama: 'Dewi Lestari', peran: 'Social Media', slug: 'dewi' },
  { id: 5, nama: 'Eka Pratama', peran: 'Video Editor', slug: 'eka' }
])

// Kompetensi yang dinilai
const kompetensi = ref([
  { id: 'kerja-sama', nama: 'Kerja Sama Tim', warna: 'bg-blue-500' },
  { id: 'produktivitas', nama: 'Produktivitas', warna: 'bg-green-500' },
  { id: 'kualitas', nama: 'Kualitas Kerja', warna: 'bg-indigo-500' },
  { id: 'inisiatif', nama: 'Inisiatif', warna: 'bg-purple-500' },
  { id: 'disiplin', nama: 'Kedisiplinan', warna: 'bg-amber-500' }
])

// Label skor
const scoreLabels = {
  1: 'Perlu Perbaikan',
  2: 'Di Bawah Standar',
  3: 'Sesuai Harapan',
  4: 'Baik',
  5: 'Sangat Baik'
}

const getLabel = (kompetensiId, skor) => {
  return skor ? scoreLabels[skor] : 'Belum dinilai'
}

// Cari anggota berdasarkan slug
onMounted(() => {
  const member = anggotaTim.value.find(a => a.slug === anggotaSlug)
  if (member) {
    selectedMember.value = member
    loading.value = false
  } else {
    error.value = `Anggota dengan slug "${anggotaSlug}" tidak ditemukan.`
    loading.value = false
  }

  // Isi nilai default
  kompetensi.value.forEach(k => {
    nilai.value[k.id] = null
  })
})

// Hitung rata-rata
const rataRata = computed(() => {
  const values = Object.values(nilai.value).filter(v => v !== null)
  if (values.length === 0) return null
  const total = values.reduce((a, b) => a + b, 0)
  return (total / values.length).toFixed(2)
})

// Aksi
const simpanEvaluasi = async () => {
  if (!feedback.value.trim()) {
    alert('Mohon isi feedback konstruktif.')
    return
  }

  submitting.value = true

  // Di sini bisa kirim ke API
  const evaluationData = {
    timSlug,
    anggotaSlug,
    nilai: nilai.value,
    feedback: feedback.value,
    rataRata: rataRata.value,
    tanggal: new Date().toISOString().split('T')[0]
  }

  console.log('Evaluasi disimpan:', evaluationData)

  // Simulasi API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  alert(`Evaluasi untuk ${selectedMember.value.nama} berhasil disimpan!`)
  router.push(`/ketua-tim/${timSlug}/anggota`)
}

const batal = () => {
  if (confirm('Yakin batal? Data yang sudah diisi akan hilang.')) {
    router.back()
  }
}
</script>