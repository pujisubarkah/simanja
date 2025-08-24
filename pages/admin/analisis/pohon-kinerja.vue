<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">🌳 Pohon Kinerja</h1>

    <!-- Filter periode -->
    <div class="mb-6 flex gap-4">
      <select v-model="selectedYear" class="border rounded p-2">
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="refreshChart">
        Tampilkan
      </button>
    </div>

    <!-- Pilihan Tampilan -->
    <div class="mb-4 flex gap-4">
      <label class="font-semibold">Tampilan:</label>
      <select v-model="mode" class="border rounded p-2">
        <option value="struktur">Struktur</option>
        <option value="tree">Tree</option>
      </select>
    </div>

    <!-- Tree Interaktif dengan ECharts -->
    <div class="bg-white rounded-xl shadow p-6 overflow-auto" style="min-height: 600px;">
      <client-only>
        <v-chart :option="treeOption" autoresize style="height: 800px; width: 100%;" />
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { TreeChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, ToolboxComponent } from 'echarts/components'

use([CanvasRenderer, TreeChart, TitleComponent, TooltipComponent, ToolboxComponent])

const years = [2023, 2024, 2025]
const selectedYear = ref(2025)
const mode = ref('struktur')

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

// --- Opsi ECharts ---
const treeOption = computed(() => {
  if (mode.value === 'struktur') {
    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        backgroundColor: 'rgba(0,0,0,0.8)',
        textStyle: { color: '#fff' },
        padding: 12,
        extraCssText: 'border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);'
      },
      toolbox: {
        show: true,
        feature: {
          restore: { show: true },
          saveAsImage: { show: true },
          dataZoom: {
            show: true,
            title: {
              zoom: 'Zoom In',
              back: 'Zoom Out'
            }
          }
        },
        right: 20,
        top: 10
      },
      series: [
        {
          type: 'tree',
          data: [treeData],
          top: '10%',
          left: '10%',
          bottom: '10%',
          right: '10%',
          symbol: 'rect',
          symbolSize: [240, 70],
          orient: 'vertical',
          roam: true,
          scaleLimit: { min: 0.5, max: 3 },
          expandAndCollapse: true,
          initialTreeDepth: 5,
          label: {
            position: 'inside',
            verticalAlign: 'middle',
            align: 'center',
            fontSize: 13,
            fontFamily: 'Poppins',
            borderRadius: 8,
            padding: [10, 16],
            lineHeight: 18,
            overflow: 'break',
            width: 200
          },
          leaves: {
            symbolSize: [180, 180],
            label: {
              position: 'insideTop',
              verticalAlign: 'top',
              align: 'center',
              overflow: 'break',
              width: 160
            }
          },
          itemStyle: {
            borderWidth: 2,
            shadowColor: '#1976D2',
            shadowBlur: 6,
            borderRadius: 8,
          },
          animationDuration: 600,
          animationDurationUpdate: 300
        }
      ]
    }
  } else {
    // 🔥 MODE TREE: Horizontal, bersih, dengan ikon & hierarki jelas
    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.85)',
        textStyle: { color: '#fff', fontSize: 12 },
        borderColor: 'transparent',
        padding: [10, 15]
      },
      series: [
        {
          type: 'tree',
          data: [treeData],
          orient: 'LR', // Left to Right
          roam: true,
          scaleLimit: { min: 0.5, max: 2.5 },
          expandAndCollapse: true,
          initialTreeDepth: 2,
          top: '5%',
          bottom: '5%',
          left: '10%',
          right: '20%',
          lineStyle: {
            curveness: 0.6,
            width: 2,
            color: '#9e9e9e'
          },
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
            fontSize: 12,
            fontFamily: 'Poppins, sans-serif',
            color: '#212121',
            lineHeight: 16,
            overflow: 'break',
            width: 180,
            formatter: function (params) {
              const name = params.name;
              if (name.includes('Visi')) return '🎯 ' + name;
              if (name.includes('Misi')) return '📌 ' + name;
              if (name.includes('Sasaran Program')) return '🎯 ' + name;
              if (name.includes('Indikator Program')) return '📊 ' + name;
              if (name.includes('Program')) return '🗂️ ' + name;
              if (name.includes('Sasaran Kegiatan')) return '🎯 ' + name;
              if (name.includes('Kegiatan')) return '📝 ' + name;
              if (name.includes('Indikator Kegiatan')) return '📈 ' + name;
              if (name.includes('Tim')) return '👥 ' + name;
              if (name.includes('Progress')) return '✅ ' + name;
              return '👤 ' + name;
            }
          },
          itemStyle: {
            color: '#42A5F5',
            borderColor: '#1976D2',
            borderWidth: 1.5,
            shadowColor: 'rgba(66, 165, 245, 0.2)',
            shadowBlur: 8,
            borderRadius: 6
          },
          leaves: {
            label: {
              fontWeight: 'bold',
              color: '#D81B60'
            },
            itemStyle: {
              color: '#F06292',
              borderColor: '#D81B60'
            }
          },
          animationDuration: 600,
          animationDurationUpdate: 300
        }
      ]
    }
  }
})

// Fungsi refresh
const refreshChart = () => {
  console.log('Menampilkan data untuk tahun:', selectedYear.value)
}
</script>

<style>
.echarts {
  overflow: auto;
}
</style>