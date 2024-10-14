// stores/useRegistrationStore.js
import { defineStore } from 'pinia'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    basicInfo: {
      firstName: '',
      lastName: '',
      dob: null,
      gender: '',
      location: '',
      phone: ''
    },
    accountInfo: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  }),
  actions: {
    updateBasicInfo(info) {
      this.basicInfo = { ...this.basicInfo, ...info }
    },
    updateAccountInfo(info) {
      this.accountInfo = { ...this.accountInfo, ...info }
    }
  }
})
