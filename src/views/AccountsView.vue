<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccountsStore } from '@/stores/accounts'

import AccountForm from '@/components/AccountForm.vue'

const store = useAccountsStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <AccountForm />
</template>
