<!-- /pages/pimpinan/kinerja-unit.vue -->
<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-8 text-green-700 flex items-center gap-2">
      <span>🏢</span> Monitoring Kinerja Unit
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(unit, idx) in unitList" :key="idx" class="bg-white rounded-2xl shadow-lg p-6 border border-green-200 hover:shadow-2xl transition">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-green-400 to-green-200 shadow text-2xl">{{ unit.icon }}</span>
          <h2 class="text-xl font-bold text-green-800">{{ unit.nama }}</h2>
        </div>
        <p class="text-gray-700 mb-2">{{ unit.deskripsi }}</p>
        <div class="mb-4">
          <span class="font-semibold text-green-700">Capaian Fisik:</span>
          <div class="w-full bg-gray-200 rounded-full h-4 mt-1">
            <div class="bg-green-500 h-4 rounded-full transition-all" :style="{ width: unit.capaianFisik + '%' }"></div>
          </div>
          <span class="text-xs text-green-800 font-bold">{{ unit.capaianFisik }}%</span>
        </div>
        <div class="mb-4">
          <span class="font-semibold text-blue-700">Capaian Keuangan:</span>
          <div class="w-full bg-gray-200 rounded-full h-4 mt-1">
            <div class="bg-blue-500 h-4 rounded-full transition-all" :style="{ width: unit.capaianKeuangan + '%' }"></div>
          </div>
          <span class="text-xs text-blue-800 font-bold">{{ unit.capaianKeuangan }}%</span>
        </div>
        <div class="flex gap-2 mt-4">
          <button @click="openModal('detail', unit)" class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">Detail Unit</button>
          <button @click="openModal('laporan', unit)" class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">Laporan</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl">&times;</button>
        <template v-if="modalType === 'detail'">
          <h2 class="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><span>{{ selectedUnit.icon }}</span> {{ selectedUnit.nama }}</h2>
          <p class="mb-2 text-gray-700">{{ selectedUnit.deskripsi }}</p>
          <div class="mb-4">
            <span class="font-semibold text-green-700">Capaian Fisik:</span>
            <div class="w-full bg-gray-200 rounded-full h-4 mt-1">
              <div class="bg-green-500 h-4 rounded-full transition-all" :style="{ width: selectedUnit.capaianFisik + '%' }"></div>
            </div>
            <span class="text-xs text-green-800 font-bold">{{ selectedUnit.capaianFisik }}%</span>
          </div>
          <div class="mb-4">
            <span class="font-semibold text-blue-700">Capaian Keuangan:</span>
            <div class="w-full bg-gray-200 rounded-full h-4 mt-1">
              <div class="bg-blue-500 h-4 rounded-full transition-all" :style="{ width: selectedUnit.capaianKeuangan + '%' }"></div>
            </div>
            <span class="text-xs text-blue-800 font-bold">{{ selectedUnit.capaianKeuangan }}%</span>
          </div>
          <div class="mt-4">
            <span class="font-semibold text-gray-700">Info Tambahan:</span>
            <ul class="list-disc list-inside text-gray-600 mt-2">
              <li v-for="(info, i) in selectedUnit.info || []" :key="i">{{ info }}</li>
              <li v-if="!(selectedUnit.info && selectedUnit.info.length)" class="italic text-gray-400">Belum ada info tambahan.</li>
            </ul>
          </div>
        </template>
        <template v-else-if="modalType === 'laporan'">
          <h2 class="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><span>{{ selectedUnit.icon }}</span> Laporan {{ selectedUnit.nama }}</h2>
          <div class="mb-4">
            <span class="font-semibold text-gray-700">Rekap Laporan:</span>
            <ul class="list-disc list-inside text-gray-600 mt-2">
              <li v-for="(lap, i) in selectedUnit.laporan || []" :key="i">{{ lap }}</li>
              <li v-if="!(selectedUnit.laporan && selectedUnit.laporan.length)" class="italic text-gray-400">Belum ada laporan.</li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const unitId = userStore.unit_kerja_id // ambil dari Pinia
console.log('unit_kerja_id dari Pinia:', unitId)
const unitData = ref(null)
const unitList = ref([])

onMounted(async () => {
  const res = await fetch(`/api/unit_kerja/${unitId}`)
  const data = await res.json()
  unitData.value = data
  unitList.value = data.sub_units || []
})

const showModal = ref(false)
const modalType = ref('detail')
const selectedUnit = ref({})
function openModal(type, unit) {
  modalType.value = type
  selectedUnit.value = unit
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
definePageMeta({ layout: 'pimpinan' })
</script>
<style>
.animate-fadeIn {
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>