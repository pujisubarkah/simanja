// composables/useProgress.js
export const useProgress = (timSlug) => {
  const { $api } = useNuxtApp() // asumsi kamu punya $api
  const progressList = ref([])
  const loading = ref(false)

  const loadProgress = async () => {
    loading.value = true
    try {
      progressList.value = await $api(`/progress/tim/${timSlug}`)
    } catch (error) {
      console.error('Gagal muat progres:', error)
    } finally {
      loading.value = false
    }
  }

  const addFeedback = async (progressId, feedback) => {
    await $api(`/progress/${progressId}/feedback`, {
      method: 'POST',
      body: { feedback }
    })
  }

  return { progressList, loading, loadProgress, addFeedback }
}