<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const slug = route.params.slug

const userStore = useUserStore()
</script>

<template>
  <aside class="w-64 h-screen shadow flex flex-col" style="background: linear-gradient(135deg, #0288D1 0%, #B3E5FC 100%);">
    
    <!-- Header -->
    <div class="p-6 border-b" style="border-bottom: 2px solid #FFD700;">
      <span class="text-xl font-bold tracking-wide" style="color: #FFD700; text-shadow: 0 2px 8px #0277BD;">
        Halo, {{ userStore.user?.nama_lengkap || 'User' }}
      </span>
      <div class="text-sm text-blue-50">Anggota Tim</div>
    </div>

    <!-- Menu Utama -->
    <nav class="flex-1 p-4">
      <ul class="menu menu-lg rounded-box space-y-1">

        <!-- Dashboard -->
        <li class="menu-title text-blue-900">Dashboard</li>
        <li>
          <NuxtLink 
            :to="`/anggota/${slug}/dashboard`" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            🏠 Dashboard Saya
          </NuxtLink>
        </li>

        <!-- Target & Progres -->
        <li class="menu-title mt-4 text-blue-900">Target & Progres</li>
        <li>
          <NuxtLink :to="`/anggota/${slug}/target`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            🎯 Target Saya
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/anggota/${slug}/progress`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            ✍️ Input Progres
          </NuxtLink>
        </li>

        <!-- Evaluasi Diri -->
        <li class="menu-title mt-4 text-blue-900">Evaluasi Diri</li>
        <li>
          <NuxtLink :to="`/anggota/${slug}/self-assessment`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            📝 Self-Assessment
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/anggota/${slug}/penilaian`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold relative">
            🌟 Penilaian Atasan
            <!-- Contoh badge jika ada update -->
            <!-- <span class="badge badge-info badge-sm ml-auto">1</span> -->
          </NuxtLink>
        </li>

        <!-- Laporan & Profil -->
        <li class="menu-title mt-4 text-blue-900">Laporan & Profil</li>
        <li>
          <NuxtLink :to="`/anggota/${slug}/laporan`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            📄 Laporan Bulanan
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/anggota/${slug}/profil`" class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold">
            👤 Profil Saya
          </NuxtLink>
        </li>

      </ul>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t text-center text-xs" style="border-top: 2px solid #222; color: #222; background: rgba(2, 136, 209, 0.08);">
      &copy; 2025 Manajemen Kinerja
    </div>
  </aside>
</template>