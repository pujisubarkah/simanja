<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar dinamis sesuai menuConfig dan role -->
    <Sidebar />

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-y-auto">
      <Header />
      <div class="p-4 flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'
import Header from '~/components/Header.vue'
</script>
