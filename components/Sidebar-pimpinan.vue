<!-- PimpinanSidebar.vue -->
<template>
  <aside class="w-64 h-screen shadow flex flex-col" style="background: linear-gradient(135deg, #1976D2 0%, #C2E7F6 100%);">
    <div class="p-6 border-b" style="border-bottom: 2px solid #FFD700;">
      <span class="text-xl font-bold tracking-wide" style="color: #FFD700; text-shadow: 0 2px 8px #1976D2;">Manajemen Kinerja</span>
    </div>
    <nav class="flex-1 p-4">
      <ul class="menu menu-lg rounded-box space-y-1">
        <li class="menu-title text-blue-900">Dashboard</li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/dashboard`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            📊 Dashboard Utama
          </NuxtLink>
        </li>
        <li class="menu-title mt-4 text-blue-900">Monitoring Kinerja</li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/unit`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            🏢 Kinerja Unit
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/tim`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            👥 Kinerja Tim
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/pegawai`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            👤 Performa Individu
          </NuxtLink>
        </li>
        <li class="menu-title mt-4 text-blue-900">Analisis</li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/pohon-kinerja`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            🌳 Pohon Kinerja
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/indikator`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            📊 Indikator Kinerja
          </NuxtLink>
        </li>
        <li class="menu-title mt-4 text-blue-900">Laporan & Persetujuan</li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/laporan`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold relative" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            📄 Laporan Bulanan
            <span class="badge badge-warning badge-sm ml-auto">3</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/pimpinan/${slug}/approval`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold" active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4">
            ✅ Persetujuan SKP
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t text-center text-xs" style="border-top: 2px solid #222; color: #222; background: rgba(25, 118, 210, 0.08);">
      &copy; 2025 Manajemen Kinerja
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const slug = route.params.slug || ''
</script>

<style scoped>
/* Add any component-specific styles here */
</style>