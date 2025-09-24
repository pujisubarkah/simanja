import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    unit_kerja_id: null
  }),
  actions: {
    setUser(user: any) {
      this.user = user
      this.unit_kerja_id = user?.unit_kerja_id || null
    }
  },
  persist: true
})
