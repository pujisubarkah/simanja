<template>
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Pembentukan Tim Unit</h1>

    <!-- Pilih Kegiatan -->
    <div class="card bg-base-100 shadow mb-6">
      <div class="card-body">
        <h2 class="text-lg font-semibold mb-2">Pilih Kegiatan</h2>
        <select v-model="selectedKegiatan" class="select select-bordered w-full mb-4">
          <option value="" disabled>Pilih kegiatan...</option>
          <option v-for="kegiatan in kegiatanList" :key="kegiatan.id" :value="kegiatan.id">
            {{ kegiatan.nama }}
          </option>
        </select>
        <button class="btn btn-primary" :disabled="!selectedKegiatan" @click="showAssignModal = true">
          Buat Tim
        </button>
      </div>
    </div>

    <!-- Modal Buat Tim -->
    <Dialog :open="showAssignModal" @close="showAssignModal = false">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <DialogPanel class="bg-white rounded shadow p-6 w-full max-w-md">
          <h3 class="text-lg font-bold mb-4">Buat Tim untuk Kegiatan</h3>

          <div class="mb-4">
            <strong>Kegiatan:</strong> {{ kegiatanList.find(k => k.id === selectedKegiatan)?.nama || '-' }}
          </div>

          <form @submit.prevent="addTeam">
            <!-- Ketua Tim -->
            <div class="mb-4">
              <label class="block mb-1 font-semibold">Ketua Tim</label>
              <select v-model="teamForm.ketua" class="select select-bordered w-full" required>
                <option value="" disabled>Pilih ketua...</option>
                <option v-for="pegawai in pegawaiList" :key="pegawai.id" :value="pegawai.id">
                  {{ pegawai.nama }}
                </option>
              </select>
            </div>

            <!-- Anggota Tim (Combobox Multiple) -->
            <div class="mb-4">
              <label class="block mb-1 font-semibold">Anggota Tim</label>
              <Combobox v-model="teamForm.anggota" multiple>
                <div class="relative">
                  <ComboboxInput
                    class="input input-bordered w-full"
                    placeholder="Cari anggota..."
                    @change="query = $event.target.value"
                  />
                  <ComboboxOptions class="absolute z-10 w-full bg-white border mt-1 rounded shadow">
                    <ComboboxOption
                      v-for="pegawai in filteredPegawai"
                      :key="pegawai.id"
                      :value="pegawai.id"
                      class="cursor-pointer px-3 py-1 hover:bg-gray-100"
                    >
                      {{ pegawai.nama }}
                    </ComboboxOption>
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>

            <!-- Tombol Aksi -->
            <div class="flex justify-end gap-2">
              <button type="button" class="btn btn-ghost" @click="showAssignModal = false">Batal</button>
              <button type="submit" class="btn btn-primary">Simpan Tim</button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>

    <!-- Rekap Tim -->
    <div class="card bg-base-100 shadow mt-6">
      <div class="card-body">
        <h2 class="text-lg font-semibold mb-2">Rekap Tim Semua Kegiatan</h2>
        <table class="table table-zebra table-bordered w-full text-left border-collapse">
          <thead class="bg-info text-center">
            <tr>
              <th>No</th>
              <th>Kegiatan</th>
              <th>Ketua Tim</th>
              <th>Anggota Tim</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(kegiatan, idx) in kegiatanList" :key="kegiatan.id" class="border-b hover:bg-gray-50">
              <td class="text-center">{{ idx + 1 }}</td>
              <td>{{ kegiatan.nama }}</td>
              <td>
                {{
                  getPegawaiName(members[kegiatan.id]?.find(m => m.role === 'Ketua')?.id) || '-'
                }}
              </td>
              <td>
                <ul>
                  <li
                    v-for="member in (members[kegiatan.id] || []).filter(m => m.role === 'Anggota')"
                    :key="member.id"
                  >
                    {{ getPegawaiName(member.id) }}
                  </li>
                  <li v-if="!members[kegiatan.id] || (members[kegiatan.id]?.filter(m => m.role === 'Anggota').length === 0)">-</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption
} from "@headlessui/vue"
import { Dialog, DialogPanel } from "@headlessui/vue"

// Dummy data kegiatan
const kegiatanList = ref([
  { id: "1", nama: "Kegiatan A" },
  { id: "2", nama: "Kegiatan B" },
  { id: "3", nama: "Kegiatan C" }
])

// Dummy data pegawai
const pegawaiList = ref([
  { id: "p1", nama: "Budi Santoso" },
  { id: "p2", nama: "Siti Aminah" },
  { id: "p3", nama: "Andi Wijaya" },
  { id: "p4", nama: "Dewi Lestari" }
])

const selectedKegiatan = ref("")
const members = ref<Record<string, Array<{ id: string; role: string }>>>({})
const showAssignModal = ref(false)
const teamForm = ref({ ketua: "", anggota: [] as string[] })
const query = ref("")

// Filter pegawai untuk combobox
const filteredPegawai = computed(() =>
  query.value === ""
    ? pegawaiList.value
    : pegawaiList.value.filter(p =>
        p.nama.toLowerCase().includes(query.value.toLowerCase())
      )
)

function addTeam() {
  if (!selectedKegiatan.value) return
  members.value[selectedKegiatan.value] = [
    { id: teamForm.value.ketua, role: "Ketua" },
    ...teamForm.value.anggota.map(a => ({ id: a, role: "Anggota" }))
  ]
  teamForm.value.ketua = ""
  teamForm.value.anggota = []
  showAssignModal.value = false
}

function getPegawaiName(id: string | undefined) {
  return pegawaiList.value.find(p => p.id === id)?.nama || ""
}
</script>
