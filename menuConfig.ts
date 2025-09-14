// menuConfig.ts
// Konfigurasi menu sidebar terpusat untuk semua role

export const menuConfig = {
  admin: [
    { label: 'Dashboard', icon: '📊', to: '/admin/dashboard' },
    { label: 'Renstra', icon: '📑', to: '/admin/renstra' },
    { label: 'Renja', icon: '📋', to: '/admin/renja' },
    { label: 'Perjanjian Kinerja', icon: '🤝', to: '/admin/pk' },
    { label: 'Rencana Aksi', icon: '⚡', to: '/admin/rencana-aksi' },
    { label: 'Monitoring & Evaluasi', icon: '📈', to: '/admin/monitoring' },
    { label: 'Manajemen Dokumen', icon: '🗂️', to: '/admin/dokumen' },
    { label: 'Master Sasaran Program', icon: '🎯', to: '/admin/master-sasaran-program' },
    { label: 'Master Sasaran Kegiatan', icon: '🗂️', to: '/admin/master-sasaran-kegiatan' },
    { label: 'Master Data', icon: '🗃️', to: '/admin/master' },
    { label: 'User & Role', icon: '👤', to: '/admin/user' },
    { label: 'Audit Trail', icon: '📝', to: '/admin/audit' }
  ],
  ketua: [
    { label: 'Dashboard', icon: '📊', to: (user: User) => `/ketua/${user?.timSlug || 'tim'}/dashboard` },
    { label: 'Tim Saya', icon: '👥', to: (user: User) => `/ketua/${user?.timSlug || 'tim'}/anggota` },
    { label: 'Evaluasi', icon: '�', to: (user: User) => `/ketua/${user?.timSlug || 'tim'}/evaluasi` },
    { label: 'Laporan', icon: '📄', to: (user: User) => `/ketua/${user?.timSlug || 'tim'}/laporan` },
    { label: 'Progress', icon: '📈', to: (user: User) => `/ketua/${user?.timSlug || 'tim'}/progress` },
    { label: 'Manajemen Dokumen', icon: '🗂️', to: (user: User) => `/ketua/${user?.timSlug || 'tim'}/dokumen` }
  ],
  pimpinan: [
    { label: 'Dashboard', icon: '📊', to: (user: User) => `/pimpinan/${user?.username || 'slug'}/dashboard` },
    { label: 'Renstra', icon: '📑', to: (user: User) => `/pimpinan/${user?.username || 'slug'}/renstra` },
    { label: 'Renja', icon: '📋', to: (user: User) => `/pimpinan/${user?.username || 'slug'}/renja` },
    { label: 'Perjanjian Kinerja', icon: '🤝', to: (user: User) => `/pimpinan/${user?.username || 'slug'}/pk` },
    { label: 'Rencana Aksi', icon: '⚡', to: (user: User) => `/pimpinan/${user?.username || 'slug'}/rencana-aksi` },
    { label: 'Monitoring & Evaluasi', icon: '📈', to: (user: User) => `/pimpinan/${user?.username || 'slug'}/monitoring` },
    { label: 'Manajemen Dokumen', icon: '🗂️', to: (user: User) => `/pimpinan/${user?.username || 'slug'}/dokumen` }
  ],
  pegawai: [
    { label: 'Dashboard', icon: '📊', to: (user: User) => `/anggota/${user?.username || 'slug'}/dashboard` },
    { label: 'Laporan', icon: '📄', to: (user: User) => `/anggota/${user?.username || 'slug'}/laporan` },
    { label: 'Penilaian', icon: '📝', to: (user: User) => `/anggota/${user?.username || 'slug'}/penilaian` },
    { label: 'Progress', icon: '📈', to: (user: User) => `/anggota/${user?.username || 'slug'}/progress` },
    { label: 'Self-Assessment', icon: '🧑‍💼', to: (user: User) => `/anggota/${user?.username || 'slug'}/self-assessment` },
    { label: 'Target', icon: '🎯', to: (user: User) => `/anggota/${user?.username || 'slug'}/target` },
    { label: 'Profil', icon: '👤', to: (user: User) => `/anggota/${user?.username || 'slug'}/profil` }
  ],
  unit_kerja: [
    { label: 'Dashboard', icon: '📊', to: '/unit/dashboard' },
    { label: 'Renstra Unit', icon: '📑', to: '/unit/renstra' },
    { label: 'Renja Unit', icon: '📋', to: '/unit/renja' },
    { label: 'Perjanjian Kinerja Unit', icon: '🤝', to: '/unit/pk' },
    { label: 'Rencana Aksi', icon: '⚡', to: '/unit/rencana-aksi' },
    { label: 'Monitoring Unit', icon: '📈', to: '/unit/monitoring' },
    { label: 'Dokumen Unit', icon: '🗂️', to: '/unit/dokumen' }
  ],
    pimpinan_strategis: [
    { label: 'Dashboard', icon: '📊', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/dashboard` },
    { label: 'Pohon Kinerja', icon: '🌳', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/pohon-kinerja` },
    { label: 'Renstra', icon: '📑', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/renstra` },
    { label: 'Renja', icon: '📋', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/renja` },
    { label: 'Perjanjian Kinerja', icon: '🤝', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/pk` },
    { label: 'Capaian Unit Kerja', icon: '🏢', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/capaian-unit` },
    { label: 'Monitoring & Evaluasi', icon: '📈', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/monitoring` },
    { label: 'Dokumen', icon: '🗂️', to: (user: User) => `/pimpinan/strategis/${user?.username || 'slug'}/dokumen` }
  ],
    pimpinan_unit: [
    { label: 'Dashboard', icon: '📊', to: (user: User) => `/pimpinan/unit/${user?.username || 'slug'}/dashboard` },
    { label: 'Tim & Pegawai', icon: '👥', to: (user: User) => `/pimpinan/unit/${user?.username || 'slug'}/tim` },
 
    { label: 'Renja', icon: '📋', to: (user: User) => `/pimpinan/unit/${user?.username || 'slug'}/renja` },
    { label: 'Perjanjian Kinerja', icon: '🤝', to: (user: User) => `/pimpinan/unit/${user?.username || 'slug'}/pk` },
    { label: 'Rencana Aksi', icon: '⚡', to: (user: User) => `/pimpinan/unit/${user?.username || 'slug'}/rencana-aksi` },
    { label: 'Monitoring & Evaluasi', icon: '📈', to: (user: User) => `/pimpinan/unit/${user?.username || 'slug'}/monitoring` },
    { label: 'Dokumen', icon: '🗂️', to: (user: User) => `/pimpinan/unit/${user?.username || 'slug'}/dokumen` }
  ]
}

// Composable untuk mengambil menu sesuai role

import type { Ref } from 'vue'

type User = {
  role_id?: number
  [key: string]: any
}

export function useSidebarMenu() {
  const userStore = useUserStore()
  return computed(() => {
    const user = userStore.user as User | null
    if (!user) return []
    if (user.role_id === 1) return menuConfig.admin
    if (user.role_id === 7) {
      // handle dynamic timSlug for ketua
      return menuConfig.ketua.map(item => ({
        ...item,
        to: typeof item.to === 'function' ? item.to(user) : item.to
      }))
    }
    if (user.role_id === 2) {
      // Pimpinan Strategis
      return menuConfig.pimpinan_strategis.map(item => ({
        ...item,
        to: typeof item.to === 'function' ? item.to(user) : item.to
      }))
    }
    if (user.role_id === 3) {
      // Pimpinan Unit
      return menuConfig.pimpinan_unit.map(item => ({
        ...item,
        to: typeof item.to === 'function' ? item.to(user) : item.to
      }))
    }
    if (user.role_id === 4) return menuConfig.unit_kerja
    if (user.role_id === 6) {
      // handle dynamic slug for pegawai
      return menuConfig.pegawai.map(item => ({
        ...item,
        to: typeof item.to === 'function' ? item.to(user) : item.to
      }))
    }
    return []
  })
}
