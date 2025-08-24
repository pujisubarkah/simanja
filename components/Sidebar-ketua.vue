<template>
  <aside class="w-64 h-screen shadow flex flex-col" style="background: linear-gradient(135deg, #0288D1 0%, #B3E5FC 100%);">
    <div class="p-6 border-b" style="border-bottom: 2px solid #FFD700;">
      <span class="text-xl font-bold tracking-wide" style="color: #FFD700; text-shadow: 0 2px 8px #0277BD;">Ketua Tim</span>
    </div>
    <nav class="flex-1 p-4">
      <ul class="menu menu-lg rounded-box">
        <li class="menu-title text-blue-900">Dashboard</li>
        <li>
          <NuxtLink :to="`/ketua/${timSlug}/dashboard`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            📊 Ringkasan Kinerja Tim
          </NuxtLink>
        </li>

        <li class="menu-title mt-4 text-blue-900">Tim</li>
        <li>
          <NuxtLink :to="`/ketua/${timSlug}/anggota`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            👥 Anggota Tim
          </NuxtLink>
        </li>

        <li class="menu-title mt-4 text-blue-900">Monitoring</li>
        <li>
          <NuxtLink :to="`/ketua/${timSlug}/progress`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            ⏳ Progress Anggota
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/ketua/${timSlug}/laporan`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            📝 Laporan Tim
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="p-4 border-t text-center text-xs" style="border-top: 2px solid #FFD700; color: #FFD700; background: rgba(2, 136, 209, 0.08);">
      &copy; 2025 Ketua Tim
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
const timSlug = useRoute().params.timSlug
</script>
