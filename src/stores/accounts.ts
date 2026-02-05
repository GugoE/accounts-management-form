import { defineStore } from 'pinia'
import type { Account } from '@/types/account'

const STORAGE_KEY = 'accounts'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[]
  }),

  actions: {
    load() {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        this.accounts = JSON.parse(data)
      }
    },

    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts))
    },

    add() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'LDAP',
        login: '',
        password: null
      })

      this.save()
    },

    update(account: Account) {
      const index = this.accounts.findIndex(a => a.id === account.id)

      if (index !== -1) {
        this.accounts[index] = account
        this.save()
      }
    },

    remove(id: string) {
      this.accounts = this.accounts.filter(a => a.id !== id)
      this.save()
    }
  }
})
