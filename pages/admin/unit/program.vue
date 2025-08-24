<template>
  <div class="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-8 text-indigo-700 flex items-center gap-2">
      🗂️ Program
    </h1>

    <div v-for="(prog, i) in programList" :key="i" class="mb-12">
      <div class="bg-gradient-to-r from-indigo-200 to-purple-100 rounded-2xl shadow-lg p-6 border border-indigo-300 mb-4">
        <h2 class="text-2xl font-bold text-indigo-800 mb-2 flex items-center gap-2">
          <span class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">{{ i + 1 }}</span>
          {{ prog.nama }}
        </h2>
        <p class="text-gray-700 mb-2">🎯 Sasaran Strategis: <span class="bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">{{ prog.sasaran }}</span></p>
        <p v-if="prog.anggaran" class="text-gray-700 mb-4">💰 Anggaran Program: <span class="font-bold">Rp {{ formatRupiah(prog.anggaran) }}</span></p>

        <div class="mt-2">
          <h3 class="text-lg font-semibold text-purple-700 mb-2">Daftar Kegiatan:</h3>
          <ul class="space-y-2 mb-4">
            <li v-for="(k, j) in prog.kegiatan" :key="j" class="bg-white rounded-xl shadow p-3 flex items-center gap-3 border border-purple-100">
              <span class="w-7 h-7 bg-purple-400 text-white rounded-full flex items-center justify-center font-bold">{{ j + 1 }}</span>
              <span class="flex-1">
                <span class="font-bold text-purple-800">{{ k.nama }}</span>
                <span class="ml-2 text-gray-600">Target: <span class="font-bold text-indigo-700">{{ k.target }}</span></span>
              </span>
            </li>
          </ul>
          <!-- Form tambah kegiatan -->
          <form @submit.prevent="tambahKegiatan(i)" class="flex gap-2 items-center">
            <input v-model="kegiatanDraft[i].nama" placeholder="Nama kegiatan" class="border rounded-xl p-2 flex-1" required />
            <input v-model="kegiatanDraft[i].target" placeholder="Target" class="border rounded-xl p-2 w-32" required />
            <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700 transition">➕ Tambah</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const programList = ref([
  {
    nama: "Program Pemberdayaan UMKM",
    sasaran: "Meningkatkan ekonomi masyarakat",
    kegiatan: [
      { nama: "Fasilitasi permodalan UMKM", target: "100 UMKM" },
      { nama: "Pendampingan digitalisasi UMKM", target: "50 UMKM" }
    ]
  },
  {
    nama: "Program Pengembangan SDM",
    sasaran: "Meningkatkan kualitas tenaga kerja",
    kegiatan: [
      { nama: "Pelatihan keterampilan kerja", target: "200 Peserta" },
      { nama: "Workshop inovasi daerah", target: "5 Kegiatan" }
    ]
  }
])

const kegiatanDraft = ref(programList.value.map(() => ({ nama: '', target: '' })))

function tambahKegiatan(i) {
  if (kegiatanDraft.value[i].nama.trim() && kegiatanDraft.value[i].target.trim()) {
    programList.value[i].kegiatan.push({
      nama: kegiatanDraft.value[i].nama,
      target: kegiatanDraft.value[i].target
    })
    kegiatanDraft.value[i] = { nama: '', target: '' }
  }
}
</script>
