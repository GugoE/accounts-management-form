<template>
  <div class="account-list">
    <AccountItem
        v-for="account in store.accounts"
        :key="account.id"
        :account="account"
    />
    <p v-if="!store.accounts.length" class="account-list__empty">
      Нет учетных записей
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import AccountItem from './AccountItem.vue'

const store = useAccountsStore()
</script>

<style lang="scss" scoped>
.account-list {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__empty {
    text-align: center;
    color: #aaa;
    margin-top: 40px;
  }
}
</style>
