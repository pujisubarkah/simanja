<!-- /pages/pimpinan/pegawai.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
    <h1 class="text-3xl font-extrabold text-green-700 flex items-center gap-2 mb-8">
      <span>👤</span> Monitoring Performa Pegawai
    </h1>
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
      <table class="w-full">
        <thead class="bg-green-50">
          <tr class="text-left text-sm text-green-700">
            <th class="font-semibold p-4">Foto</th>
            <th class="font-semibold p-4">Nama</th>
            <th class="font-semibold p-4">Unit Kerja</th>
            <th class="font-semibold p-4">Tim Kerja</th>
            <th class="font-semibold p-4">Jabatan</th>
            <th class="font-semibold p-4">Kinerja</th>
            <th class="font-semibold p-4">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-green-100">
          <tr v-for="(pegawai, idx) in pegawaiList" :key="idx" class="hover:bg-green-50 transition">
            <td class="p-4">
              <img :src="pegawai.foto" alt="foto" class="w-10 h-10 rounded-full border-2 border-green-400 shadow" />
            </td>
            <td class="p-4 font-bold text-green-800">{{ pegawai.nama }}</td>
            <td class="p-4 text-gray-700">{{ pegawai.unitKerja }}</td>
            <td class="p-4 text-blue-700 font-semibold">{{ pegawai.timKerja }}</td>
            <td class="p-4 text-green-700 font-semibold">{{ pegawai.jabatan }}</td>
            <td class="p-4">
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-green-500 h-3 rounded-full transition-all" :style="{ width: pegawai.kinerja + '%' }"></div>
              </div>
              <span class="text-xs text-green-800 font-bold">{{ pegawai.kinerja }}%</span>
            </td>
            <td class="p-4">
              <NuxtLink :to="`/pimpinan/pegawai/${pegawai.slug}`" class="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600 transition text-xs font-bold">Detail</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'pimpinan' })
// Middleware dinonaktifkan sementara
// definePageMeta({ middleware: ['auth'] })
const pegawaiList = [
  {
    nama: "Anisa Rahma",
    slug: "anisa-rahma",
    foto: "https://randomuser.me/api/portraits/women/1.jpg",
    jabatan: "Staff HRD",
    unitKerja: "HRD",
    timKerja: "Tim Rekrutmen",
    kinerja: 92
  },
  {
    nama: "Budi Santoso",
    slug: "budi-santoso",
    foto: "https://randomuser.me/api/portraits/men/2.jpg",
    jabatan: "Ketua Tim IT",
    unitKerja: "IT",
    timKerja: "Tim Dev",
    kinerja: 68
  },
  {
    nama: "Citra Dewi",
    slug: "citra-dewi",
    foto: "https://randomuser.me/api/portraits/women/3.jpg",
    jabatan: "Staff Keuangan",
    unitKerja: "Keuangan",
    timKerja: "Tim Akuntansi",
    kinerja: 64
  },
  {
    nama: "Dewi Lestari",
    slug: "dewi-lestari",
    foto: "https://randomuser.me/api/portraits/women/4.jpg",
    jabatan: "Staff Marketing",
    unitKerja: "Marketing",
    timKerja: "Tim Digital",
    kinerja: 88
  },
  {
    nama: "Eka Pratama",
    slug: "eka-pratama",
    foto: "https://randomuser.me/api/portraits/men/5.jpg",
    jabatan: "Staff Operasional",
    unitKerja: "Operasional",
    timKerja: "Tim Logistik",
    kinerja: 80
  }
]
</script>