import { ref } from 'vue'

export function useProgress(timSlug) {
  const progressList = ref([])
  const loading = ref(false)

  function loadProgress() {
    loading.value = true
    // Simulasi fetch data, bisa diganti dengan API
    setTimeout(() => {
      progressList.value = [
        {
          id: 1,
          task: 'Selesaikan draft laporan bulanan',
          nama: 'Andi Prasetyo',
          date: '2025-04-05',
          status: 'completed',
          description: 'Draft sudah selesai dan dikirim ke ketua tim untuk review.',
          progress: 100,
          feedback: ''
        },
        {
          id: 2,
          task: 'Upload konten media sosial',
          nama: 'Citra Dewi',
          date: '2025-04-05',
          status: 'in-progress',
          description: 'Sudah buat 3 konten, 2 lagi dalam proses.',
          progress: 60,
          feedback: ''
        },
        {
          id: 3,
          task: 'Edit video kampanye',
          nama: 'Eka Pratama',
          date: '2025-04-04',
          status: 'late',
          description: 'Terhambat karena render error, akan diselesaikan besok.',
          progress: 40,
          feedback: ''
        },
        {
          id: 4,
          task: 'Desain banner promosi',
          nama: 'Budi Santoso',
          date: '2025-04-03',
          status: 'completed',
          description: 'Desain sudah disetujui oleh stakeholder.',
          progress: 100,
          feedback: ''
        },
        {
          id: 5,
          task: 'Input data pelanggan',
          nama: 'Dewi Lestari',
          date: '2025-04-02',
          status: 'completed',
          description: 'Data dari 50 pelanggan sudah diinput ke sistem.',
          progress: 100,
          feedback: ''
        }
      ]
      loading.value = false
    }, 500)
  }

  function addFeedback(progress) {
    const idx = progressList.value.findIndex(p => p.id === progress.id)
    if (idx !== -1) {
      progressList.value[idx].feedback = progress.feedback
    }
  }

  return {
    progressList,
    loading,
    loadProgress,
    addFeedback
  }
}
