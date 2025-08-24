<template>
  <div class="p-6 bg-gradient-to-br from-yellow-50 to-green-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-6 text-green-700 flex items-center gap-2">
      📝 Daftar Kegiatan
    </h1>

    <!-- Card Program -->
    <div v-for="(program, pIndex) in programList" :key="pIndex" class="mb-12">
      <div class="bg-gradient-to-r from-green-200 to-green-100 rounded-2xl shadow-lg p-6 border border-green-300 mb-4">
        <h2 class="text-2xl font-bold text-green-800 mb-2 flex items-center gap-2">
          <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">{{ pIndex + 1 }}</span>
          {{ program.nama }}
        </h2>
        <p class="text-gray-700">💰 Anggaran Program: <span class="font-bold">Rp {{ formatRupiah(program.anggaran) }}</span></p>
      </div>

      <!-- Card Kegiatan di bawah program -->
      <div v-for="(kegiatan, i) in program.kegiatan" :key="i" class="mb-8 ml-8">
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
          <h2 class="text-xl font-bold text-blue-700 mb-2">{{ kegiatan.nama }}</h2>
          <p class="text-gray-700">💰 Anggaran: <span class="font-bold">Rp {{ formatRupiah(kegiatan.anggaran) }}</span></p>
          <p class="text-gray-700">🎯 Target Fisik: <span class="font-bold">{{ kegiatan.targetFisik }} %</span></p>

          <!-- Tabel input realisasi -->
          <div class="overflow-x-auto mt-4">
            <table class="table-auto border-collapse w-full text-left">
              <thead>
                <tr class="bg-green-100 text-green-800">
                  <th class="p-2 border">Triwulan</th>
                  <th class="p-2 border">Realisasi Fisik (%)</th>
                  <th class="p-2 border">Realisasi Keuangan (Rp)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, tIndex) in triwulan" :key="tIndex" class="hover:bg-gray-50">
                  <td class="p-2 border font-semibold">{{ t }}</td>
                  <td class="p-2 border">
                    <input 
                      type="number" 
                      v-model.number="kegiatan.realisasiFisik[tIndex]" 
                      class="w-24 border rounded p-1 text-center"
                    />
                  </td>
                  <td class="p-2 border">
                    <input 
                      type="number" 
                      v-model.number="kegiatan.realisasiKeuangan[tIndex]" 
                      class="w-32 border rounded p-1 text-center"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Progress capaian -->
          <div class="mt-6 space-y-4">
            <!-- Progress Fisik -->
            <div>
              <p class="font-bold text-sm text-blue-800">
                📊 Capaian Fisik: {{ totalFisik(kegiatan) }} % 
                (dari target {{ kegiatan.targetFisik }} %)
              </p>
              <div class="w-full bg-gray-200 rounded-full h-4">
                <div 
                  class="bg-blue-500 h-4 rounded-full transition-all" 
                  :style="{ width: capaianFisik(kegiatan) + '%' }">
                </div>
              </div>
            </div>

            <!-- Progress Keuangan -->
            <div>
              <p class="font-bold text-sm text-green-800">
                💵 Capaian Keuangan: Rp {{ totalKeuangan(kegiatan).toLocaleString() }} 
                ({{ capaianKeuangan(kegiatan) }} % dari Rp {{ kegiatan.anggaran.toLocaleString() }})
              </p>
              <div class="w-full bg-gray-200 rounded-full h-4">
                <div 
                  class="bg-green-500 h-4 rounded-full transition-all" 
                  :style="{ width: capaianKeuangan(kegiatan) + '%' }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const triwulan = ["TW1", "TW2", "TW3", "TW4"]

const programList = ref([
  {
    nama: "Program Pemberdayaan Ekonomi Masyarakat",
    anggaran: 170000000,
    kegiatan: [
      {
        nama: "Pelatihan UMKM",
        anggaran: 50000000,
        targetFisik: 100,
        realisasiFisik: [20, 30, 25, 0],
        realisasiKeuangan: [5000000, 10000000, 8000000, 0]
      },
      {
        nama: "Pengembangan Infrastruktur Pasar",
        anggaran: 120000000,
        targetFisik: 100,
        realisasiFisik: [15, 25, 40, 0],
        realisasiKeuangan: [20000000, 30000000, 25000000, 0]
      }
    ]
  },
  {
    nama: "Program Penguatan SDM",
    anggaran: 90000000,
    kegiatan: [
      {
        nama: "Pelatihan Guru",
        anggaran: 40000000,
        targetFisik: 100,
        realisasiFisik: [30, 30, 20, 0],
        realisasiKeuangan: [10000000, 12000000, 8000000, 0]
      },
      {
        nama: "Workshop Pendidikan Vokasi",
        anggaran: 50000000,
        targetFisik: 100,
        realisasiFisik: [20, 30, 30, 0],
        realisasiKeuangan: [8000000, 15000000, 12000000, 0]
      }
    ]
  }
])

// Hitung total fisik
function totalFisik(kegiatan) {
  return kegiatan.realisasiFisik.reduce((a, b) => a + (b || 0), 0)
}

// Capaian fisik (% dari target)
function capaianFisik(kegiatan) {
  const total = totalFisik(kegiatan)
  return kegiatan.targetFisik > 0 ? Math.min((total / kegiatan.targetFisik) * 100, 100).toFixed(2) : 0
}

// Hitung total keuangan
function totalKeuangan(kegiatan) {
  return kegiatan.realisasiKeuangan.reduce((a, b) => a + (b || 0), 0)
}

// Capaian keuangan (% dari anggaran)
function capaianKeuangan(kegiatan) {
  const total = totalKeuangan(kegiatan)
  return kegiatan.anggaran > 0 ? Math.min((total / kegiatan.anggaran) * 100, 100).toFixed(2) : 0
}

// Format Rupiah
function formatRupiah(angka) {
  return angka.toLocaleString("id-ID")
}
</script>
