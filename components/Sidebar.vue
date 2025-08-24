<template>
  <aside class="w-64 h-screen shadow flex flex-col" style="background: linear-gradient(135deg, #1976D2 0%, #C2E7F6 100%);">
    <div class="p-6 border-b" style="border-bottom: 2px solid #FFD700;">
      <span class="text-xl font-bold tracking-wide" style="color: #FFD700; text-shadow: 0 2px 8px #1976D2;">Manajemen Kinerja</span>
    </div>

    <nav class="flex-1 p-4">
      <ul class="menu menu-lg rounded-box space-y-1">

        <!-- Organisasi -->
        <li class="menu-title text-blue-900">Organisasi</li>
        <li>
          <NuxtLink 
            to="/admin/organisasi/visi-misi" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            🎯 Visi & Misi
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/admin/organisasi/sasaran" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            📈 Sasaran Program
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/admin/organisasi/indikator" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            📊 Rencana Aksi
          </NuxtLink>
        </li>

        <!-- Analisis -->
        <li class="menu-title mt-4 text-blue-900">Analisis</li>
        <li>
          <NuxtLink 
            to="/admin/analisis/pohon-kinerja" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            🌳 Pohon Kinerja
          </NuxtLink>
        </li>

        <!-- Unit Kerja -->
        <li class="menu-title mt-4 text-blue-900">Unit Kerja</li>
        <li>
          <NuxtLink 
            to="/admin/unit/program" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            🗂️ Program
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/admin/unit/kegiatan" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            📝 Kegiatan
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/admin/unit/target" 
            class="hover:bg-blue-100 hover:text-yellow-600 transition rounded-lg px-2 py-1 font-semibold"
            active-class="bg-blue-100 text-blue-900 font-bold border-l-4 border-yellow-500 -ml-2 pl-4"
          >
            🎯 Target Unit
          </NuxtLink>
        </li>

      </ul>
    </nav>

    <div class="p-4 border-t text-center text-xs" style="border-top: 2px solid #222; color: #222; background: rgba(25, 118, 210, 0.08);">
      &copy; 2025 Manajemen Kinerja
    </div>
  </aside>
</template>