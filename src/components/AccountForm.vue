<template>
  <div class="account-form">
    <div class="account-form__header">
      <h2>Учетные записи</h2>
      <el-button type="primary" circle @click="addAccount">+</el-button>
    </div>

    <div class="account-form__hint">
      <el-icon class="account-form__hint-icon"><QuestionFilled /></el-icon>
      <span class="account-form__hint-text">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </span>
    </div>

    <AccountList />
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import AccountList from './AccountList.vue'
import { QuestionFilled } from '@element-plus/icons-vue'

const store = useAccountsStore()

function addAccount() {
  store.add()
}
</script>

<style lang="scss" scoped>
.account-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  &__hint {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    background: #eef3ff;
    color: #2b2f36;
    margin-bottom: 20px;
  }

  &__hint-icon {
    font-size: 18px;
    flex: 0 0 auto;
  }

  &__hint-text {
    font-size: 14px;
    line-height: 1.3;
  }
}
</style>
