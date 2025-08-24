<template>
  <div class="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
    <h1 class="text-3xl font-extrabold mb-8 text-blue-700 flex items-center gap-2">
      <span>🛡️</span> Dashboard Admin
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white rounded-2xl shadow p-6 border border-blue-200">
        <h2 class="text-xl font-bold text-blue-700 mb-2">Manajemen Pengguna</h2>
        <p class="text-gray-600 mb-4">Kelola data pegawai, ketua tim, dan admin aplikasi.</p>
        <NuxtLink to="/admin/users" class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">Kelola Pengguna</NuxtLink>
      </div>
      <div class="bg-white rounded-2xl shadow p-6 border border-green-200">
        <h2 class="text-xl font-bold text-green-700 mb-2">Monitoring Kinerja</h2>
        <p class="text-gray-600 mb-4">Lihat rekap kinerja unit, tim, dan pegawai.</p>
        <NuxtLink to="/admin/monitoring" class="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition">Monitoring Kinerja</NuxtLink>
      </div>
      <div class="bg-white rounded-2xl shadow p-6 border border-yellow-200">
        <h2 class="text-xl font-bold text-yellow-700 mb-2">Pengaturan Sistem</h2>
        <p class="text-gray-600 mb-4">Atur periode, hak akses, dan konfigurasi aplikasi.</p>
        <NuxtLink to="/admin/settings" class="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition">Pengaturan Sistem</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Halaman dashboard admin, hanya tampilan utama
</script>
