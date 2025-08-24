export default defineNuxtRouteMiddleware((to, from) => {
  // Contoh: redirect ke halaman login jika belum login
  const isLoggedIn = !!useCookie('token').value
  if (!isLoggedIn) {
    return navigateTo('/login')
  }
})
