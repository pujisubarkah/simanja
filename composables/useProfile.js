// composables/useProfile.js
export const useProfile = (slug) => {
  const profile = ref(null)
  const loading = ref(true)

  const load = async () => {
    profile.value = await $fetch(`/api/pegawai/${slug}`)
    loading.value = false
  }

  return { profile, loading, load }
}