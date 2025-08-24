<!-- /pages/pimpinan/kinerja-tim.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <h1 class="text-3xl font-extrabold text-green-700 flex items-center gap-2">
        <span>👥</span> Monitoring Kinerja Tim
      </h1>
    </div>

    <!-- Pilih Unit -->
    <div class="bg-white p-6 rounded-2xl shadow border border-green-200 mb-8">
      <label class="block text-base font-semibold text-green-700 mb-2">Pilih Unit Kerja</label>
      <select 
        v-model="selectedUnit" 
        class="w-full md:w-1/3 px-4 py-2 border border-green-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 font-semibold text-green-800"
      >
        <option value="">-- Pilih Unit --</option>
        <option v-for="unit in units" :key="unit.slug" :value="unit.slug">
          {{ unit.name }}
        </option>
      </select>
    </div>

    <!-- Tampilkan Tim Jika Unit Dipilih -->
    <template v-if="selectedUnit">
      <div class="bg-white rounded-2xl shadow border border-green-200 overflow-hidden">
        <div class="p-6 border-b border-green-100">
          <h2 class="text-xl font-bold text-green-700">
            Daftar Tim di Unit: <span class="text-blue-600">{{ getUnitName(selectedUnit) }}</span>
          </h2>
        </div>

        <table class="w-full">
          <thead class="bg-green-50">
            <tr class="text-left text-sm text-green-700">
              <th class="font-semibold p-4">Tim</th>
              <th class="font-semibold p-4">Ketua Tim</th>
              <th class="font-semibold p-4">Kinerja</th>
              <th class="font-semibold p-4">Progres</th>
              <th class="font-semibold p-4">Tugas Terlambat</th>
              <th class="font-semibold p-4">Status</th>
              <th class="font-semibold p-4">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-green-100">
            <tr 
              v-for="tim in filteredTeams" 
              :key="tim.id" 
              class="hover:bg-green-50 transition"
            >
              <td class="p-4 font-bold text-green-800">{{ tim.name }}</td>
              <td class="p-4 text-green-700 font-semibold">{{ tim.leader }}</td>
              <td class="p-4 font-bold" :class="textColor(tim.performance)">
                {{ tim.performance }}%
              </td>
              <td class="p-4">
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    class="h-3 rounded-full" 
                    :class="progressColor(tim.performance)"
                    :style="{ width: tim.performance + '%' }"
                  ></div>
                </div>
              </td>
              <td class="p-4">
                <span 
                  :class="tim.lateTasks > 0 ? 'text-red-600 font-bold' : 'text-green-700 font-semibold'"
                >
                  {{ tim.lateTasks }}
                </span>
              </td>
              <td class="p-4">
                <span 
                  class="px-3 py-1 rounded-full text-xs font-bold"
                  :class="statusBadge(tim.performance)"
                >
                  {{ statusText(tim.performance) }}
                </span>
              </td>
              <td class="p-4">
                <NuxtLink 
                  :to="`/pimpinan/kinerja-tim/${tim.slug}`" 
                  class="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600 transition text-xs font-bold"
                >
                  Detail
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Tidak Ada Tim -->
        <div v-if="filteredTeams.length === 0" class="p-8 text-center text-gray-400">
          Tidak ada tim di unit ini.
        </div>
      </div>
    </template>

    <!-- Belum Pilih Unit -->
    <div v-else class="bg-white p-12 rounded-2xl shadow border border-green-200 text-center text-gray-400">
      <p>Pilih unit terlebih dahulu untuk melihat daftar tim.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'pimpinan' })
// Middleware dinonaktifkan sementara
// definePageMeta({ middleware: ['auth'] })

// Data Unit (untuk dropdown)
const units = ref([
  { slug: 'hrd', name: 'HRD' },
  { slug: 'marketing', name: 'Marketing' },
  { slug: 'it', name: 'IT' },
  { slug: 'keuangan', name: 'Keuangan' },
  { slug: 'operasional', name: 'Operasional' }
])

// Data Tim (dummy) — nanti dari API berdasarkan unit
const teams = ref([
  // HRD
  { id: 1, name: 'Tim Rekrutmen', leader: 'Anisa Rahma', unit: 'hrd', performance: 92, lateTasks: 0, slug: 'rekrutmen' },
  { id: 2, name: 'Tim Pelatihan', leader: 'Budi Santoso', unit: 'hrd', performance: 85, lateTasks: 1, slug: 'pelatihan' },

  // Marketing
  { id: 3, name: 'Tim Digital', leader: 'Citra Dewi', unit: 'marketing', performance: 88, lateTasks: 0, slug: 'digital' },
  { id: 4, name: 'Tim Event', leader: 'Dewi Lestari', unit: 'marketing', performance: 74, lateTasks: 3, slug: 'event' },

  // IT
  { id: 5, name: 'Tim Dev', leader: 'Eka Pratama', unit: 'it', performance: 80, lateTasks: 2, slug: 'dev' },
  { id: 6, name: 'Tim Support', leader: 'Fajar Nugraha', unit: 'it', performance: 66, lateTasks: 5, slug: 'support' },

  // Keuangan
  { id: 7, name: 'Tim Akuntansi', leader: 'Gita Permata', unit: 'keuangan', performance: 70, lateTasks: 2, slug: 'akuntansi' },
  { id: 8, name: 'Tim Anggaran', leader: 'Hadi Prabowo', unit: 'keuangan', performance: 62, lateTasks: 4, slug: 'anggaran' },

  // Operasional
  { id: 9, name: 'Tim Logistik', leader: 'Indra Wijaya', unit: 'operasional', performance: 84, lateTasks: 1, slug: 'logistik' },
])

// State
const selectedUnit = ref('')

// Computed: Tim yang sesuai unit terpilih
const filteredTeams = computed(() => {
  if (!selectedUnit.value) return []
  return teams.value.filter(tim => tim.unit === selectedUnit.value)
})

// Fungsi bantu
const getUnitName = (slug) => {
  const unit = units.value.find(u => u.slug === slug)
  return unit ? unit.name : 'Tidak Diketahui'
}

const textColor = (perf) => {
  if (perf >= 80) return 'text-green-600'
  if (perf >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

const progressColor = (perf) => {
  if (perf >= 80) return 'bg-green-500'
  if (perf >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

const statusText = (perf) => {
  if (perf >= 80) return 'Baik'
  if (perf >= 60) return 'Perlu Perhatian'
  return 'Rendah'
}

const statusBadge = (perf) => {
  if (perf >= 80) return 'bg-green-100 text-green-800'
  if (perf >= 60) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}
</script>

<style scoped>
/* Hover effect */
tr:hover td {
  background-color: #f0fdf4;
}
</style>