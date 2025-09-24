<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-200 to-blue-100 relative overflow-hidden">
    <!-- Decorative Circles -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full opacity-30 blur-2xl animate-float"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl animate-float2"></div>
    <div class="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl animate-float3"></div>
    <div class="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-4xl z-10 relative flex flex-col md:flex-row overflow-hidden">
      <!-- Carousel Section -->
      <div class="md:w-1/2 w-full flex items-center justify-center bg-blue-50 p-8">
        <div class="w-full">
          <div class="relative w-full h-96 rounded-2xl overflow-hidden">
            <img :src="carouselImages[carouselIndex]" alt="Carousel" class="object-cover w-full h-full transition duration-700" />
            <button @click="prevImage" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-blue-200"><span>&lt;</span></button>
            <button @click="nextImage" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-blue-200"><span>&gt;</span></button>
          </div>
          <div class="flex justify-center mt-3 gap-2">
            <span v-for="(img, i) in carouselImages" :key="i" :class="['w-3 h-3 rounded-full', carouselIndex === i ? 'bg-blue-600' : 'bg-blue-300']"></span>
          </div>
        </div>
      </div>
      <!-- Login Section -->
      <div class="md:w-1/2 w-full flex flex-col justify-center p-10">
        <div class="flex flex-col items-center mb-6">
          <div class="flex gap-4 mb-2">
            <img src="/lanri_.png" alt="LAN RI" class="w-40 h-40 object-contain drop-shadow-lg" />
            <img src="/berakhlak.png" alt="BerAKHLAK" class="w-40 h-40 object-contain drop-shadow-lg" />
          </div>
          <h1 class="text-3xl font-extrabold text-blue-700 mb-2 text-center tracking-wide">Sistem Informasi Manajemen Kinerja<br><span class="text-blue-500">E-Performance</span></h1>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-blue-700 mb-1">NIP / Username</label>
            <input v-model="username" type="text" class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-blue-700 mb-1">Password</label>
            <input v-model="password" type="password" class="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
          </div>
          <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-2 rounded-lg shadow hover:scale-105 hover:from-blue-700 transition-all">Login</button>
        </form>
        <div class="mt-6 text-center text-sm text-gray-400">@Pusdatin 2025</div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'login'
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
const username = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const carouselImages = [
  '/kinerja.jpg',
  '/aplikasi.jpg',
  '/akuntabilitas.jpg'
]
const carouselIndex = ref(0)
const nextImage = () => {
  carouselIndex.value = (carouselIndex.value + 1) % carouselImages.value.length
}
const prevImage = () => {
  carouselIndex.value = (carouselIndex.value - 1 + carouselImages.value.length) % carouselImages.value.length
}

const handleLogin = async () => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
  const data = await res.json()
  if (data.success) {
    userStore.setUser(data.user)
    console.log('unit_kerja_id setelah login:', userStore.unit_kerja_id)
    // Redirect sesuai role
    if (data.user.role_id === 1) {
      router.push('/admin')
    } else if (data.user.role_id === 6) {
      router.push(`/anggota/${data.user.username}/dashboard`)
    } else if (data.user.role_id === 2 || data.user.role_id === 3) {
      router.push(`/pimpinan/${data.user.username}/dashboard`)
    } else {
      router.push('/')
    }
  } else {
    alert(data.error)
  }
}
</script>

<style>
.animate-float {
  animation: float 8s ease-in-out infinite alternate;
}
.animate-float2 {
  animation: float2 10s ease-in-out infinite alternate;
}
.animate-float3 {
  animation: float3 12s ease-in-out infinite alternate;
}
@keyframes float {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(40px) scale(1.1); }
}
@keyframes float2 {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-60px) scale(1.05); }
}
@keyframes float3 {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(30px) scale(1.08); }
}
</style>
