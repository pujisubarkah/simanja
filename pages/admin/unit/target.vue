<template>
  <div class="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-6 text-indigo-700">
      🏢 Unit Kerja
    </h1>
    <div v-for="(unit, uIndex) in units" :key="uIndex" class="mb-12">
      <h2 class="text-2xl font-bold text-indigo-800 mb-4">{{ unit.nama }}</h2>
      <div v-for="(program, pIndex) in unit.programs" :key="pIndex" class="mb-10">
        <!-- Program -->
        <div class="bg-white rounded-2xl shadow-lg border p-6 mb-4">
          <h2 class="text-2xl font-bold text-blue-800 mb-2">
            📂 {{ program.nama }}
          </h2>
          <p class="text-gray-600">🎯 Anggaran: Rp {{ formatRupiah(program.anggaran) }}</p>
        </div>

        <!-- Daftar kegiatan -->
        <div class="grid gap-6 md:grid-cols-2">
          <div 
            v-for="(kegiatan, kIndex) in program.kegiatan" 
            :key="kIndex"
            class="bg-gradient-to-br from-yellow-50 to-green-50 rounded-xl p-6 shadow border"
          >
            <h3 class="text-xl font-bold text-green-700 mb-2">
              📝 {{ kegiatan.nama }}
            </h3>
            <p class="text-gray-700 mb-2">
              Anggaran: Rp {{ formatRupiah(kegiatan.anggaran) }}
            </p>

            <!-- Input realisasi per TW -->
            <div class="overflow-x-auto">
              <table class="table-auto border-collapse w-full text-left text-sm">
                <thead>
                  <tr class="bg-green-100">
                    <th class="p-2 border">Triwulan</th>
                    <th class="p-2 border">Fisik (%)</th>
                    <th class="p-2 border">Keuangan (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tw, tIndex) in triwulan" :key="tIndex">
                    <td class="p-2 border font-semibold">{{ tw }}</td>
                    <td class="p-2 border">
                      <input 
                        type="number" 
                        v-model.number="kegiatan.realisasi[tIndex].fisik"
                        class="w-20 border rounded p-1 text-center"
                      />
                    </td>
                    <td class="p-2 border">
                      <input 
                        type="number" 
                        v-model.number="kegiatan.realisasi[tIndex].keuangan"
                        class="w-32 border rounded p-1 text-center"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Progress bar -->
            <div class="mt-4">
              <p class="font-semibold">Progress Fisik: {{ avgFisik(kegiatan) }}%</p>
              <div class="w-full bg-gray-200 rounded-full h-4">
                <div 
                  class="bg-green-500 h-4 rounded-full" 
                  :style="{ width: avgFisik(kegiatan) + '%' }">
                </div>
              </div>

              <p class="font-semibold mt-2">
                Progress Keuangan: Rp {{ totalKeuangan(kegiatan) }} / Rp {{ formatRupiah(kegiatan.anggaran) }}
              </p>
              <div class="w-full bg-gray-200 rounded-full h-4">
                <div 
                  class="bg-blue-500 h-4 rounded-full" 
                  :style="{ width: keuanganPct(kegiatan) + '%' }">
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

const units = ref([
  {
    nama: "Dinas UMKM",
    programs: [
      {
        nama: "Pemberdayaan UMKM",
        anggaran: 500000000,
        kegiatan: [
          {
            nama: "Pelatihan Digital Marketing",
            anggaran: 200000000,
            realisasi: [
              { fisik: 20, keuangan: 50000000 },
              { fisik: 30, keuangan: 70000000 },
              { fisik: 0, keuangan: 0 },
              { fisik: 0, keuangan: 0 }
            ]
          },
          {
            nama: "Pameran Produk UMKM",
            anggaran: 300000000,
            realisasi: [
              { fisik: 25, keuangan: 80000000 },
              { fisik: 40, keuangan: 90000000 },
              { fisik: 0, keuangan: 0 },
              { fisik: 0, keuangan: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    nama: "Dinas Pendidikan",
    programs: [
      {
        nama: "Pendidikan Dasar",
        anggaran: 600000000,
        kegiatan: [
          {
            nama: "Pelatihan Guru",
            anggaran: 250000000,
            realisasi: [
              { fisik: 10, keuangan: 30000000 },
              { fisik: 20, keuangan: 50000000 },
              { fisik: 0, keuangan: 0 },
              { fisik: 0, keuangan: 0 }
            ]
          },
          {
            nama: "Pengadaan Buku",
            anggaran: 350000000,
            realisasi: [
              { fisik: 15, keuangan: 50000000 },
              { fisik: 25, keuangan: 80000000 },
              { fisik: 0, keuangan: 0 },
              { fisik: 0, keuangan: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    nama: "Dinas Kesehatan",
    programs: [
      {
        nama: "Peningkatan Kesehatan Masyarakat",
        anggaran: 700000000,
        kegiatan: [
          {
            nama: "Vaksinasi COVID-19",
            anggaran: 300000000,
            realisasi: [
              { fisik: 50, keuangan: 150000000 },
              { fisik: 70, keuangan: 200000000 },
              { fisik: 0, keuangan: 0 },
              { fisik: 0, keuangan: 0 }
            ]
          },
          {
            nama: "Pengadaan Alat Kesehatan",
            anggaran: 400000000,
            realisasi: [
              { fisik: 20, keuangan: 80000000 },
              { fisik: 30, keuangan: 90000000 },
              { fisik: 0, keuangan: 0 },
              { fisik: 0, keuangan: 0 }
            ]
          }
        ]
      }
    ]
  }
])

// Helpers
function avgFisik(kegiatan) {
  const total = kegiatan.realisasi.reduce((sum, tw) => sum + (tw.fisik || 0), 0)
  return (total / triwulan.length).toFixed(2)
}

function totalKeuangan(kegiatan) {
  return kegiatan.realisasi.reduce((sum, tw) => sum + (tw.keuangan || 0), 0)
}

function keuanganPct(kegiatan) {
  return kegiatan.anggaran > 0
    ? ((totalKeuangan(kegiatan) / kegiatan.anggaran) * 100).toFixed(2)
    : 0
}

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID").format(num)
}
</script>
