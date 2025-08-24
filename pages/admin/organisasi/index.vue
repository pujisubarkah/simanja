<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex items-center justify-center relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-2xl animate-float"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl animate-float2"></div>
    <div class="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-2xl animate-float3"></div>
    <div class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl z-10 relative">
      <div class="flex flex-col items-center mb-6">
        <img src="/lanri_.png" alt="LAN RI" class="w-20 h-20 object-contain drop-shadow-lg mb-2" />
        <img src="/berakhlak.png" alt="BerAKHLAK" class="w-20 h-20 object-contain drop-shadow-lg mb-2" />
        <h1 class="text-3xl font-extrabold text-blue-700 mb-2 text-center tracking-wide">Ringkasan Organisasi</h1>
      </div>
      <p class="text-gray-700 text-center mb-6 text-lg">
        Halaman ini berisi ringkasan tentang struktur, visi, misi, dan tujuan organisasi. Informasi penting terkait organisasi dapat ditampilkan secara singkat dan visual.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <span class="text-blue-600 text-xl font-bold mb-2">Struktur Organisasi</span>
          <span class="text-gray-600 text-center">Menampilkan bagan dan susunan tim.</span>
        </div>
        <div class="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <span class="text-blue-600 text-xl font-bold mb-2">Visi & Misi</span>
          <span class="text-gray-600 text-center">Penjelasan singkat visi dan misi organisasi.</span>
        </div>
        <div class="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <span class="text-blue-600 text-xl font-bold mb-2">Tujuan</span>
          <span class="text-gray-600 text-center">Sasaran utama yang ingin dicapai.</span>
        </div>
        <div class="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
          <span class="text-blue-600 text-xl font-bold mb-2">Informasi Lain</span>
          <span class="text-gray-600 text-center">Data penting terkait organisasi.</span>
        </div>
      </div>
      <div class="mt-8 text-center text-sm text-gray-400">@Pusdatin 2025</div>
    </div>
  </div>
</template>

<script setup>
// Halaman ringkasan organisasi
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float2 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(30px) scale(1.1); }
}
@keyframes float3 {
  0%, 100% { transform: translateX(0) scale(1); }
  50% { transform: translateX(-20px) scale(1.08); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float2 {
  animation: float2 8s ease-in-out infinite;
}
.animate-float3 {
  animation: float3 7s ease-in-out infinite;
}
</style>
