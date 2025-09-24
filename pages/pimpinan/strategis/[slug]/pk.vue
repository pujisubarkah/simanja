<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">📊 Perjanjian Kinerja (PK)</h1>
    </div>

    <div class="mb-4 text-sm text-gray-500">unit_kerja_id dari Pinia: <span class="font-bold">{{ userStore.unit_kerja_id }}</span></div>

    <!-- Table PK -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered">
            <thead class="bg-info text-center">
              <tr>
                <th>No</th>
                <th>Unit Kerja</th>
                <th>Sasaran</th>
                <th>Indikator</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredPkData" :key="row.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ row.unit_kerja }}</td>
                <td>{{ row.sasaran }}</td>
                <td>{{ row.indikator }}</td>
                <td>{{ row.target }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const loading = ref(false)
const error = ref('')

async function handleLogin(username, password) {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const result = await res.json()
    if (result.success && result.user) {
      userStore.setUser(result.user)
      console.log('unit_kerja_id setelah login:', userStore.unit_kerja_id)
      // lakukan redirect jika perlu
    } else {
      error.value = result.error || 'Login gagal'
    }
  } catch (e) {
    error.value = 'Login gagal'
  } finally {
    loading.value = false
  }
}

const pkList = ref([])

async function fetchPK() {
  const unitKerjaId = userStore.unit_kerja_id
  if (!unitKerjaId) {
    error.value = 'unit_kerja_id dari Pinia belum tersedia!'
    console.warn('unit_kerja_id kosong, tidak fetch PK')
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`/api/perjanjian_kinerja/${unitKerjaId}`)
    const result = await res.json()
    if (result.success) {
      pkList.value = result.data
    } else {
      error.value = result.message || 'Gagal fetch data PK'
    }
  } catch (e) {
    error.value = 'Gagal fetch data PK'
  } finally {
    loading.value = false
  }
}

onMounted(fetchPK)

watch(() => userStore.unit_kerja_id, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    console.log('unit_kerja_id berubah:', newVal)
    fetchPK()
  }
})

const unitKerjaList = ref([
  ...new Set(pkList.value.map(row => row.unit_kerja))
])
const selectedUnitKerja = ref('')
const filteredPkData = computed(() =>
  selectedUnitKerja.value
    ? pkList.value.filter(r => r.unit_kerja === selectedUnitKerja.value)
    : pkList.value
)
</script>

<style scoped>
</style>