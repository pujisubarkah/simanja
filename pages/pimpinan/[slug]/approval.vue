<!-- /pages/pimpinan/approval.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 mb-3 flex items-center justify-center gap-4">
        ✅ Persetujuan Dokumen
      </h1>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        Tinjau dan setujui dokumen penting dari unit dan pegawai.
      </p>
    </div>

    <!-- Ringkasan Cepat -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg text-center">
        <div class="text-2xl font-bold text-blue-700">{{ pendingCount }}</div>
        <div class="text-gray-600 font-medium">Menunggu</div>
      </div>
      <div class="bg-white/90 backdrop-blur-sm border border-green-100 rounded-2xl p-6 shadow-lg text-center">
        <div class="text-2xl font-bold text-green-700">{{ approvedCount }}</div>
        <div class="text-gray-600 font-medium">Disetujui</div>
      </div>
      <div class="bg-white/90 backdrop-blur-sm border border-red-100 rounded-2xl p-6 shadow-lg text-center">
        <div class="text-2xl font-bold text-red-700">{{ rejectedCount }}</div>
        <div class="text-gray-600 font-medium">Ditolak</div>
      </div>
    </div>

    <!-- Filter & Pencarian -->
    <div class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg mb-8 p-6">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-semibold text-gray-700 mb-2">🔍 Cari Dokumen</label>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Nama pegawai, unit, atau jenis dokumen" 
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Jenis</label>
          <select v-model="filterType" class="px-4 py-3 border border-gray-300 rounded-xl bg-white">
            <option value="">Semua Jenis</option>
            <option value="skp">SKP</option>
            <option value="evaluasi">Evaluasi Kinerja</option>
            <option value="target">Target Unit</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select v-model="filterStatus" class="px-4 py-3 border border-gray-300 rounded-xl bg-white">
            <option value="">Semua</option>
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Daftar Dokumen -->
    <div class="space-y-4">
      <div 
        v-for="doc in filteredDocuments" 
        :key="doc.id" 
        class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <!-- Info Dokumen -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-1">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-bold" 
                    :class="typeBadge(doc.type)">
                {{ typeLabel(doc.type) }}
              </span>
              <span class="text-sm text-gray-500">•</span>
              <span class="text-sm text-gray-600">{{ doc.date }}</span>
            </div>
            <h3 class="font-bold text-gray-800 text-lg">{{ doc.title }}</h3>
            <p class="text-gray-600 text-sm">
              Oleh: <span class="font-medium">{{ doc.submitter }}</span> | 
              Unit: <span class="font-medium">{{ doc.unit }}</span>
            </p>

            <!-- Deadline -->
            <div v-if="doc.deadline" class="mt-2 flex items-center gap-2 text-sm">
              <span :class="deadlineColor(doc.daysLeft)">
                ⏳ {{ deadlineText(doc.daysLeft) }}
              </span>
              <span class="text-gray-500">({{ doc.deadline }})</span>
            </div>
          </div>

          <!-- Aksi -->
          <div class="flex flex-col sm:flex-row gap-2 min-w-fit">
            <button 
              @click="openDetailModal(doc)" 
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
            >
              📄 Lihat
            </button>
            <button 
              @click="approve(doc)" 
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold flex items-center gap-1"
            >
              ✅ Setujui
            </button>
            <button 
              @click="reject(doc)" 
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold flex items-center gap-1"
            >
              ❌ Tolak
            </button>
          </div>
        </div>
      </div>

      <!-- Tidak Ada Dokumen -->
      <div v-if="filteredDocuments.length === 0" class="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
        <div class="text-5xl mb-4">✅</div>
        <div class="text-xl font-semibold mb-2">Tidak ada dokumen menunggu persetujuan</div>
        <div>Semua dokumen telah diproses.</div>
      </div>
    </div>

    <!-- Modal Detail (sederhana) -->
    <div v-if="selectedDoc" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-800">{{ selectedDoc.title }}</h3>
          <button @click="selectedDoc = null" class="float-right text-2xl">&times;</button>
        </div>
        <div class="p-6 space-y-4">
          <p><strong>Jenis:</strong> {{ typeLabel(selectedDoc.type) }}</p>
          <p><strong>Pengusul:</strong> {{ selectedDoc.submitter }}</p>
          <p><strong>Unit:</strong> {{ selectedDoc.unit }}</p>
          <p><strong>Tanggal:</strong> {{ selectedDoc.date }}</p>
          <p><strong>Deadline:</strong> {{ selectedDoc.deadline || '–' }}</p>
          <div><strong>Isi Ringkas:</strong>
            <ul class="list-disc list-inside mt-2 text-gray-700 space-y-1">
              <li v-for="(item, i) in selectedDoc.items" :key="i">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div class="p-6 border-t flex justify-end gap-3">
          <button @click="selectedDoc = null" class="px-4 py-2 bg-gray-200 rounded-lg">Tutup</button>
          <button @click="approve(selectedDoc)" class="px-4 py-2 bg-green-600 text-white rounded-lg">Setujui</button>
          <button @click="reject(selectedDoc)" class="px-4 py-2 bg-red-600 text-white rounded-lg">Tolak</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'pimpinan' })

// Data Dummy
const documents = ref([
  {
    id: 1,
    type: 'skp',
    title: 'SKP Triwulan 2 - Andi Prasetyo',
    submitter: 'Andi Prasetyo',
    unit: 'HRD',
    date: '03 Apr 2025',
    deadline: '10 Apr 2025',
    daysLeft: 7,
    status: 'pending',
    items: ['Laporan rekrutmen', 'Pelatihan onboarding', 'Evaluasi kinerja staf']
  },
  {
    id: 2,
    type: 'evaluasi',
    title: 'Evaluasi Kinerja Tim IT - Q1 2025',
    submitter: 'Budi Santoso',
    unit: 'IT',
    date: '02 Apr 2025',
    deadline: '05 Apr 2025',
    daysLeft: 3,
    status: 'pending',
    items: ['Penyelesaian sistem baru', 'Dukungan teknis', 'Audit keamanan']
  },
  {
    id: 3,
    type: 'target',
    title: 'Target Unit Keuangan - 2025',
    submitter: 'Citra Dewi',
    unit: 'Keuangan',
    date: '01 Apr 2025',
    deadline: '15 Apr 2025',
    daysLeft: 14,
    status: 'pending',
    items: ['Anggaran operasional', 'Pelaporan keuangan', 'Audit internal']
  }
])

// State
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')
const selectedDoc = ref(null)

// Computed: Filter
const filteredDocuments = computed(() => {
  return documents.value.filter(doc => {
    const matchesSearch = Object.values(doc).join(' ').toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !filterType.value || doc.type === filterType.value
    const matchesStatus = !filterStatus.value || doc.status === filterStatus.value
    return matchesSearch && matchesType && matchesStatus
  })
})

// Ringkasan
const pendingCount = computed(() => filteredDocuments.value.filter(d => d.status === 'pending').length)
const approvedCount = computed(() => documents.value.filter(d => d.status === 'approved').length)
const rejectedCount = computed(() => documents.value.filter(d => d.status === 'rejected').length)

// Helper
const typeLabel = (type) => {
  const labels = { skp: 'SKP', evaluasi: 'Evaluasi', target: 'Target Unit' }
  return labels[type] || type
}

const typeBadge = (type) => {
  const classes = {
    skp: 'bg-purple-100 text-purple-800',
    evaluasi: 'bg-blue-100 text-blue-800',
    target: 'bg-green-100 text-green-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const deadlineText = (days) => {
  if (days > 7) return `${days} hari lagi`
  if (days > 0) return `H-${days} ⚠️`
  return 'Tenggat habis!'
}

const deadlineColor = (days) => {
  if (days <= 0) return 'text-red-600 font-bold'
  if (days <= 3) return 'text-yellow-600 font-medium'
  return 'text-green-600'
}

// Aksi
const openDetailModal = (doc) => {
  selectedDoc.value = doc
}

const approve = (doc) => {
  alert(`Dokumen "${doc.title}" disetujui.`)
  doc.status = 'approved'
  selectedDoc.value = null
}

const reject = (doc) => {
  const reason = prompt('Alasan penolakan:')
  if (reason) {
    alert(`Dokumen "${doc.title}" ditolak.\nAlasan: ${reason}`)
    doc.status = 'rejected'
    selectedDoc.value = null
  }
}
</script>

<style scoped>
/* Optional: tambah animasi halus */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>