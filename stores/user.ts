import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    pegawai: null,
    unit_kerja_id: null
  }),
  actions: {
    setUser(user: any, pegawai?: any) {
      this.user = user
      this.pegawai = pegawai || null
      this.unit_kerja_id = pegawai?.unit_kerja_id || null
    }
  },
  persist: true
})
