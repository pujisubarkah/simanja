<!-- /pages/pimpinan/pohon-kinerja.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-2xl font-bold mb-6">🌳 Pohon Kinerja (View Only)</h1>

    <!-- Info untuk Pimpinan -->
    <div class="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 text-sm">
      <strong>Info:</strong> Halaman ini hanya untuk pemantauan. 
      Untuk mengedit struktur, silakan hubungi administrator.
    </div>

    <!-- Filter Cepat -->
    <div class="mb-6 flex gap-4 flex-wrap">
      <select v-model="filter" class="border rounded p-2">
        <option value="all">Tampilkan Semua</option>
        <option value="warning">Hanya Peringatan (Kinerja <70%)</option>
        <option value="high">Hanya Unggul (>90%)</option>
      </select>
      <button @click="refreshData" class="bg-green-600 text-white px-4 py-2 rounded">
        🔄 Refresh
      </button>
    </div>

    <!-- Legend Warna -->
    <div class="flex gap-6 mb-6 text-sm">
      <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-500"></span> Baik (≥80%)</span>
      <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-yellow-500"></span> Perlu Perhatian (60–79%)</span>
      <span class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500"></span> Rendah (<60%)</span>
    </div>

    <!-- Chart -->
    <div class="bg-white rounded-xl shadow p-6" style="min-height: 600px;">
      <client-only>
        <v-chart :option="treeOption" autoresize style="height: 700px; width: 100%;" />
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreeChart } from 'echarts/charts'
import { TooltipComponent, ToolboxComponent } from 'echarts/components'

use([CanvasRenderer, TreeChart, TooltipComponent, ToolboxComponent])

definePageMeta({ layout: 'pimpinan' })

const filter = ref('all')


// --- Helper: Buat node pegawai ---
const createEmployeeNode = (name, img, skp, score) => {
  let badgeText, badgeColor;
  if (score >= 80) {
    badgeText = 'Hijau';
    badgeColor = '#43A047';
  } else if (score >= 60) {
    badgeText = 'Kuning';
    badgeColor = '#FFD600';
  } else {
    badgeText = 'Merah';
    badgeColor = '#E53935';
  }
  return {
    name,
    value: score,
    label: {
      formatter: `{foto|}\n{name|${name}}\n{skp|${skp}}\n{badge|${badgeText}} {progress|${score}%}`,
      rich: {
        foto: {
          height: 48,
          width: 48,
          backgroundColor: {
            image: img.trim()
          },
          borderRadius: 24,
          align: 'center',
          padding: [6, 0, 6, 0]
        },
        name: {
          fontSize: 14,
          color: '#fff',
          fontWeight: 'bold',
          lineHeight: 20,
          align: 'center'
        },
        skp: {
          fontSize: 11,
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 16,
          align: 'center'
        },
        badge: {
          fontSize: 10,
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: badgeColor,
          borderRadius: 10,
          padding: [4, 8],
          align: 'center'
        },
        progress: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#D81B60',
          align: 'center',
          padding: [6, 0, 0, 0]
        }
      }
    },
    itemStyle: {
      color: '#F06292',
      borderColor: '#D81B60',
      borderWidth: 2,
      shadowColor: '#F06292',
      shadowBlur: 10,
      borderRadius: 12
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 20,
        shadowOffsetX: 0,
        shadowOffsetY: 5,
        opacity: 1
      }
    }
  }
}

// Helper untuk membuat node tim dengan badge warna progress
const createTeamNode = (name, progress, employees) => {
  let badgeText, badgeColor;
  if (progress >= 80) {
    badgeText = 'Hijau';
    badgeColor = '#43A047';
  } else if (progress >= 60) {
    badgeText = 'Kuning';
    badgeColor = '#FFD600';
  } else {
    badgeText = 'Merah';
    badgeColor = '#E53935';
  }
  return {
    name: `${name}\nProgress: ${progress}%`,
    label: {
      formatter: `{name|${name}}\n{badge|${badgeText}} {progress|${progress}%}`,
      rich: {
        name: {
          fontSize: 14,
          color: '#fff',
          fontWeight: 'bold',
          lineHeight: 20,
          align: 'center'
        },
        badge: {
          fontSize: 11,
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: badgeColor,
          borderRadius: 10,
          padding: [4, 8],
          align: 'center',
          margin: [4,0,0,0]
        },
        progress: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#D81B60',
          align: 'center',
          padding: [6, 0, 0, 0]
        }
      },
      color: '#fff',
      backgroundColor: badgeColor,
      fontSize: 14,
      fontFamily: 'Poppins',
      borderRadius: 8,
      padding: [8, 12],
      lineHeight: 20,
      overflow: 'break',
      width: 160
    },
    itemStyle: {
      color: badgeColor,
      borderColor: badgeColor,
      borderWidth: 2,
      shadowColor: badgeColor,
      shadowBlur: 8,
      borderRadius: 8,
    },
    children: employees
  };
}

// Helper untuk menghitung progress tim dari rata-rata pegawai
const getTeamProgress = (employees) => {
  if (!employees || employees.length === 0) return 0;
  const total = employees.reduce((sum, emp) => sum + (emp.value || 0), 0);
  return Math.round(total / employees.length);
}

// --- Pegawai ---
const pegawai1 = [
  createEmployeeNode('Ani', 'https://randomuser.me/api/portraits/women/1.jpg', 'Fasilitasi pelatihan', 90),
  createEmployeeNode('Maya', 'https://randomuser.me/api/portraits/women/3.jpg', 'Evaluasi peserta', 75)
]

const pegawai2 = [
  createEmployeeNode('Joko', 'https://randomuser.me/api/portraits/men/2.jpg', 'Input data kompetensi', 80),
  createEmployeeNode('Budi', 'https://randomuser.me/api/portraits/men/4.jpg', 'Verifikasi dokumen', 40),
  createEmployeeNode('Siti', 'https://randomuser.me/api/portraits/women/5.jpg', 'Monitoring pelatihan', 85)
]

// --- Tim Kerja ---
const timPelatihan = createTeamNode('Tim Pelatihan Kebijakan', getTeamProgress(pegawai1), pegawai1);
const timPemetaan = createTeamNode('Tim Pemetaan Kompetensi', getTeamProgress(pegawai2), pegawai2);

// --- STRUKTUR POHON KINERJA (SUDAH DIPERBARUI DENGAN TARGET) ---
const treeData = {
  name: 'Visi :\nMasyarakat Sejahtera, Berakhlak Mulia, Berbudaya, Sehat dan Cerdas',
  label: {
    color: '#fff',
    backgroundColor: '#1976D2',
    fontSize: 16,
    fontFamily: 'Poppins',
    borderRadius: 8,
    padding: [10, 16],
    lineHeight: 22,
    fontWeight: 'bold',
  },
  itemStyle: {
    color: '#1976D2',
    borderColor: '#1976D2',
    borderWidth: 2,
    shadowColor: '#1976D2',
    shadowBlur: 8,
    borderRadius: 8,
  },
  children: [
    {
      name: 'Misi 1 :\nMewujudkan Masyarakat Sejahtera yang Berakhlak Mulia, Berbudaya, Sehat dan Cerdas',
      label: {
        color: '#000',
        backgroundColor: '#FFD700',
        fontSize: 14,
        fontFamily: 'Poppins',
        borderRadius: 8,
        padding: [8, 12],
        lineHeight: 20,
      },
      itemStyle: {
        color: '#FFD700',
        borderColor: '#FFD700',
        borderWidth: 2,
        shadowColor: '#1976D2',
        shadowBlur: 8,
        borderRadius: 8,
      },
      children: [
        // --- SASARAN PROGRAM 1 ---
        {
          name: 'Sasaran Program :\nMeningkatnya Kualitas Kebijakan Instansi Pemerintah di Bidang Administrasi Negara',
          label: {
            color: '#1B5E20',
            backgroundColor: '#A5D6A7',
            fontSize: 14,
            fontFamily: 'Poppins',
            borderRadius: 8,
            padding: [8, 12],
            lineHeight: 20,
          },
          itemStyle: {
            color: '#A5D6A7',
            borderColor: '#388E3C',
            borderWidth: 2,
            shadowColor: '#1976D2',
            shadowBlur: 8,
            borderRadius: 8,
          },
          children: [
            {
              // 🔻 INDIKATOR PROGRAM: Target ditampilkan langsung
              name: '40% Instansi Pemerintah yang Meningkat Kualitas Tata Kelola Kebijakannya',
              label: {
                color: '#fff',
                backgroundColor: '#26A69A',
                fontSize: 14,
                fontFamily: 'Poppins',
                borderRadius: 8,
                padding: [8, 12],
                lineHeight: 20,
              },
              itemStyle: {
                color: '#26A69A',
                borderColor: '#00897B',
                borderWidth: 2,
                shadowColor: '#1976D2',
                shadowBlur: 8,
                borderRadius: 8,
              },
              children: [
                {
                  name: 'Sasaran Kegiatan :\nMeningkatnya kapasitas SDM dalam penyusunan kebijakan',
                  label: {
                    color: '#5D4037',
                    backgroundColor: '#D7CCC8',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    borderRadius: 8,
                    padding: [8, 12],
                    lineHeight: 20,
                  },
                  itemStyle: {
                    color: '#D7CCC8',
                    borderColor: '#5D4037',
                    borderWidth: 2,
                    shadowColor: '#1976D2',
                    shadowBlur: 8,
                    borderRadius: 8,
                  },
                  children: [
                    {
                      name: 'Kegiatan :\nPelatihan Penyusunan Kebijakan Berbasis Inovasi',
                      label: {
                        color: '#fff',
                        backgroundColor: '#AB47BC',
                        fontSize: 14,
                        fontFamily: 'Poppins',
                        borderRadius: 8,
                        padding: [8, 12],
                        lineHeight: 20,
                      },
                      itemStyle: {
                        color: '#AB47BC',
                        borderColor: '#8E24AA',
                        borderWidth: 2,
                        shadowColor: '#1976D2',
                        shadowBlur: 8,
                        borderRadius: 8,
                      },
                      children: [
                        {
                          // 🔻 INDIKATOR KEGIATAN: Target ditampilkan
                          name: '120 pegawai mengikuti pelatihan penyusunan kebijakan',
                          label: {
                            color: '#fff',
                            backgroundColor: '#42A5F5',
                            fontSize: 14,
                            fontFamily: 'Poppins',
                            borderRadius: 8,
                            padding: [8, 12],
                            lineHeight: 20,
                          },
                          itemStyle: {
                            color: '#42A5F5',
                            borderColor: '#1565C0',
                            borderWidth: 2,
                            shadowColor: '#1976D2',
                            shadowBlur: 8,
                            borderRadius: 8,
                          },
                          children: [timPelatihan]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        // --- SASARAN PROGRAM 2 ---
        {
          name: 'Sasaran Program :\nMeningkatnya kualitas JF bidang Pengembangan Kapasitas Administrasi Negara',
          label: {
            color: '#1B5E20',
            backgroundColor: '#A5D6A7',
            fontSize: 14,
            fontFamily: 'Poppins',
            borderRadius: 8,
            padding: [8, 12],
            lineHeight: 20,
          },
          itemStyle: {
            color: '#A5D6A7',
            borderColor: '#388E3C',
            borderWidth: 2,
            shadowColor: '#1976D2',
            shadowBlur: 8,
            borderRadius: 8,
          },
          children: [
            {
              // 🔻 INDIKATOR PROGRAM: Target 90%
              name: '90% JF di Bidang Pengembangan Kapasitas Administrasi Negara yang Sesuai Standar Kompetensi',
              label: {
                color: '#fff',
                backgroundColor: '#26A69A',
                fontSize: 14,
                fontFamily: 'Poppins',
                borderRadius: 8,
                padding: [8, 12],
                lineHeight: 20,
              },
              itemStyle: {
                color: '#26A69A',
                borderColor: '#00897B',
                borderWidth: 2,
                shadowColor: '#1976D2',
                shadowBlur: 8,
                borderRadius: 8,
              },
              children: [
                {
                  name: 'Sasaran Kegiatan :\nTersusunnya pemetaan kompetensi JF',
                  label: {
                    color: '#5D4037',
                    backgroundColor: '#D7CCC8',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    borderRadius: 8,
                    padding: [8, 12],
                    lineHeight: 20,
                  },
                  itemStyle: {
                    color: '#D7CCC8',
                    borderColor: '#5D4037',
                    borderWidth: 2,
                    shadowColor: '#1976D2',
                    shadowBlur: 8,
                    borderRadius: 8,
                  },
                  children: [
                    {
                      name: 'Kegiatan :\nPemetaan Kompetensi JF Administrasi Negara',
                      label: {
                        color: '#fff',
                        backgroundColor: '#AB47BC',
                        fontSize: 14,
                        fontFamily: 'Poppins',
                        borderRadius: 8,
                        padding: [8, 12],
                        lineHeight: 20,
                      },
                      itemStyle: {
                        color: '#AB47BC',
                        borderColor: '#8E24AA',
                        borderWidth: 2,
                        shadowColor: '#1976D2',
                        shadowBlur: 8,
                        borderRadius: 8,
                      },
                      children: [
                        {
                          // 🔻 INDIKATOR KEGIATAN: Target jumlah
                          name: '250 JF dipetakan kompetensinya sesuai standar',
                          label: {
                            color: '#fff',
                            backgroundColor: '#42A5F5',
                            fontSize: 14,
                            fontFamily: 'Poppins',
                            borderRadius: 8,
                            padding: [8, 12],
                            lineHeight: 20,
                          },
                          itemStyle: {
                            color: '#42A5F5',
                            borderColor: '#1565C0',
                            borderWidth: 2,
                            shadowColor: '#1976D2',
                            shadowBlur: 8,
                            borderRadius: 8,
                          },
                          children: [timPemetaan]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const treeOption = computed(() => {
  // Hanya mode TREE horizontal, lebih bersih
  return {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const n = params.name
        if (n.includes('Visi')) return `<b>🎯 Visi</b><br>${n}`
        if (n.includes('Misi')) return `<b>📌 Misi</b><br>${n}`
        if (n.includes('Sasaran Program')) return `<b>🎯 Sasaran Program</b><br>${n}`
        if (n.includes('Indikator')) return `<b>📊 Indikator</b><br>${n}`
        if (n.includes('Kegiatan')) return `<b>📝 Kegiatan</b><br>${n}`
        if (n.includes('Tim')) return `<b>👥 Tim</b><br>${n}`
        return `<b>👤 Pegawai</b><br>${n}`
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: { color: '#fff' }
    },
    series: [
      {
        type: 'tree',
        data: [filterTree(treeData)], // filter berdasarkan `filter`
        orient: 'LR',
        expandAndCollapse: true,
        initialTreeDepth: 2,
        label: {
          position: 'right',
          align: 'left',
          fontSize: 12,
          overflow: 'break',
          width: 180
        },
        itemStyle: {
          borderColor: '#1976D2',
          borderWidth: 1.5,
          borderRadius: 6
        },
        // Warna berdasarkan kinerja (jika ada `progress` atau `value`)
        color: (params) => {
          const value = params.value || 100
          if (value >= 80) return '#4CAF50'
          if (value >= 60) return '#FFC107'
          return '#F44336'
        },
        leaves: {
          label: { fontWeight: 'bold' }
        }
      }
    ]
  }
})

// Fungsi filter pohon (opsional)
const filterTree = (node) => {
  if (filter.value === 'all') return node

  // Di sini bisa tambah logika filter
  // Misal: hanya tampilkan node dengan kinerja <70%
  return node // placeholder
}

const refreshData = () => {
  console.log('Data diperbarui')
}
</script>