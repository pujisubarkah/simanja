<template>
  <div class="p-6">
    <!-- Success Alert -->
    <div v-if="showSuccessAlert" class="alert alert-success mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Perjanjian Kinerja berhasil ditambahkan!</span>
    </div>

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">📊 Perjanjian Kinerja (PK)</h1>
      <button @click="openModal" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" 
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 4v16m8-8H4" />
        </svg>
        Tambah PK
      </button>
    </div>

    <!-- Filter Penanggung Jawab -->
    <div class="mb-4 flex gap-4">
      <div>
        <label class="font-bold mb-2 block">Filter Penanggung Jawab</label>
        <select v-model="selectedPenanggungJawab" class="select select-bordered w-full">
          <option value="">Semua</option>
          <option v-for="pj in penanggungJawabList" :key="pj" :value="pj">{{ pj }}</option>
        </select>
      </div>
    </div>

    <!-- Table PK -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra table-bordered">
            <thead class="bg-info text-center">
              <tr>
                <th>No</th>
                <th>Tahun</th>
                <th>Sasaran</th>
                <th>Indikator</th>
                <th>Target</th>
                <th>Satuan</th>
                <th>Realisasi</th>
                <th>Status</th>
                <th>Penanggung Jawab</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in filteredPkData" :key="row.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ row.tahun }}</td>
                <td>{{ row.sasaran_strategis }}</td>
                <td>{{ row.indikator_kinerja }}</td>
                <td>{{ row.target }}</td>
                <td>{{ row.satuan }}</td>
                <td>{{ row.realisasi || '-' }}</td>
                <td>
                  <span :class="statusClass(row.status)">
                    {{ row.status }}
                  </span>
                </td>
                <td>
                  {{
                    unitKerjaOptions.find(u => u.id === row.unit_kerja_id)?.nama || row.unit_kerja_id
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Tambah PK -->
    <div v-if="isModalOpen" class="modal modal-open">
      <div class="modal-box w-11/12 max-w-3xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-xl">Tambah Perjanjian Kinerja</h3>
          <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <form @submit.prevent="addPerjanjianKinerja" class="space-y-4">
          <!-- Tahun -->
          <div class="form-control">
            <label class="label"><span class="label-text">Tahun</span></label>
            <input v-model="newPK.tahun" type="number" class="input input-bordered w-full" required />
          </div>

          <!-- Sasaran -->
          <div class="form-control">
            <label class="label"><span class="label-text">Sasaran</span></label>
            <textarea v-model="newPK.sasaran" class="textarea textarea-bordered w-full" rows="2" required></textarea>
          </div>

          <!-- Indikator -->
          <div class="form-control">
            <label class="label"><span class="label-text">Indikator</span></label>
            <textarea v-model="newPK.indikator" class="textarea textarea-bordered w-full" rows="2" required></textarea>
          </div>

          <!-- Target & Satuan -->
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text">Target</span></label>
              <input v-model="newPK.target" type="text" class="input input-bordered w-full" required />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Satuan</span></label>
              <input v-model="newPK.satuan" type="text" class="input input-bordered w-full" required />
            </div>
          </div>

          <!-- Realisasi -->
          <div class="form-control">
            <label class="label"><span class="label-text">Realisasi</span></label>
            <input v-model="newPK.realisasi" type="text" class="input input-bordered w-full" placeholder="Opsional" />
          </div>

          <!-- Status -->
          <div class="form-control">
            <label class="label"><span class="label-text">Status</span></label>
            <select v-model="newPK.status" class="select select-bordered w-full" required>
              <option value="Belum Mulai">Belum Mulai</option>
              <option value="Proses">Proses</option>
              <option value="On Track">On Track</option>
              <option value="Tercapai">Tercapai</option>
              <option value="Tidak Tercapai">Tidak Tercapai</option>
            </select>
          </div>

          <!-- Penanggung Jawab -->
          <div class="form-control">
            <label class="label"><span class="label-text">Penanggung Jawab</span></label>
            <select v-model="newPK.unit_kerja_id" class="select select-bordered w-full" required>
              <option value="">Pilih penanggung jawab</option>
              <option v-for="unit in unitKerjaOptions" :key="unit.id" :value="unit.id">{{ unit.nama }}</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="modal-action">
            <button type="button" @click="closeModal" class="btn btn-ghost">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
      <div class="modal-backdrop bg-black/50" @click="closeModal"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const pkData = ref([])
const penanggungJawabList = ref([])
const unitKerjaOptions = ref([])
const selectedPenanggungJawab = ref("")
const filteredPkData = computed(() =>
  selectedPenanggungJawab.value
    ? pkData.value.filter(r => r.penanggung_jawab === selectedPenanggungJawab.value)
    : pkData.value
)

const isModalOpen = ref(false)
const showSuccessAlert = ref(false)
const newPK = ref({
  tahun: new Date().getFullYear(),
  sasaran: "",
  indikator: "",
  target: "",
  satuan: "",
  realisasi: "",
  status: "Belum Mulai",
  unit_kerja_id: "",
  penanggung_jawab: ""
})

const fetchPKData = async () => {
  try {
    const res = await fetch("/api/perjanjian_kinerja")
    const result = await res.json()
    if (result.success) {
      pkData.value = result.data
      penanggungJawabList.value = [...new Set(result.data.map(row => row.penanggung_jawab))]
    }
  } catch (e) {
    console.error("Gagal fetch data PK", e)
  }
}

const fetchUnitKerja = async () => {
  try {
    const res = await fetch("/api/unit_kerja")
    const result = await res.json()
    unitKerjaOptions.value = result.map(u => ({ id: u.unit_id, nama: u.unit_nama }))
  } catch (e) {
    console.error("Gagal fetch unit kerja", e)
  }
}

onMounted(() => {
  fetchPKData()
  fetchUnitKerja()
})

const openModal = () => {
  isModalOpen.value = true
  newPK.value = {
    tahun: new Date().getFullYear(),
    sasaran: "",
    indikator: "",
    target: "",
    satuan: "",
    realisasi: "",
    status: "Belum Mulai",
    unit_kerja_id: "",
    penanggung_jawab: ""
  }
}
const closeModal = () => { isModalOpen.value = false }

const addPerjanjianKinerja = async () => {
  try {
    // Payload sesuai schema backend
    const payload = {
      tahun: Number(newPK.value.tahun),
      sasaran_strategis: newPK.value.sasaran,
      indikator_kinerja: newPK.value.indikator,
      target: Number(newPK.value.target),
      satuan: newPK.value.satuan,
      unit_kerja_id: Number(newPK.value.unit_kerja_id),
      realisasi: newPK.value.realisasi ? Number(newPK.value.realisasi) : 0,
      status: newPK.value.status,
      penanggung_jawab: Number(newPK.value.unit_kerja_id),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    console.log('Payload POST:', payload)
    const res = await fetch("/api/perjanjian_kinerja", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    console.log('Response POST:', result)
    if (result.success) {
      showSuccessAlert.value = true
      setTimeout(() => { showSuccessAlert.value = false }, 3000)
      closeModal()
      await fetchPKData()
    } else {
      console.error('API error:', result)
      alert(result.message || 'Gagal menambah data PK!')
    }
  } catch (e) {
    console.error("Gagal tambah PK", e)
    alert('Terjadi error saat submit: ' + e)
  }
}

const statusClass = (status) => {
  switch (status) {
    case "On Track": return "badge badge-success"
    case "Proses": return "badge badge-warning"
    case "Tercapai": return "badge badge-primary"
    case "Tidak Tercapai": return "badge badge-error"
    default: return "badge badge-ghost"
  }
}
</script>
