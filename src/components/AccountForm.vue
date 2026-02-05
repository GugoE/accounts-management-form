<template>
  <div class="account-form">
    <div class="account-form__header">
      <h2>Учетные записи</h2>
      <el-button
          type="primary"
          circle
          @click="addAccount"
      >+</el-button>
    </div>

    <div class="account-form__hint">
      <el-tooltip
          effect="dark"
          content="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
          placement="top">
        <el-icon><QuestionFilled /></el-icon>
      </el-tooltip>
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
    margin-bottom: 8px;
  }

  &__hint {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #888;
    margin-bottom: 20px;

    .el-icon {
      margin-right: 6px;
    }
  }
}
</style>
