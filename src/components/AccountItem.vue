<template>
  <el-card class="account-item">
    <el-form :model="form">
      <div class="account-item__grid">
        <el-form-item label="Метки">
          <el-input
              v-model="labelsString"
              placeholder="tag1; tag2; tag3"
              maxlength="50"
              show-word-limit
              @blur="save"
          />
        </el-form-item>

        <el-form-item label="Тип">
          <el-select v-model="form.type">
            <el-option label="LDAP" :value="AccountType.LDAP" />
            <el-option label="Локальная" :value="AccountType.LOCAL" />
          </el-select>
        </el-form-item>

        <el-form-item label="Логин *" :error="errors.login ? 'Логин обязателен' : ''">
          <el-input
              v-model="form.login"
              maxlength="100"
              show-word-limit
              @blur="save('login')"
          />
        </el-form-item>

        <el-form-item
            v-if="form.type === AccountType.LOCAL"
            label="Пароль *"
            :error="errors.password ? 'Пароль обязателен' : ''"
        >
          <el-input
              v-model="form.password"
              type="password"
              maxlength="100"
              show-word-limit
              @blur="save('password')"
          />
        </el-form-item>
      </div>
    </el-form>

    <div class="account-item__actions">
      <el-button type="danger" plain @click="remove">Удалить</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Account } from '@/types/account'
import { AccountType } from '@/types/account'
import { useAccountsStore } from '@/stores/accounts'
import { validateAccount } from '@/utils/validateAccount'
import { FieldTypes } from '@/types/account'

const props = defineProps<{ account: Account }>()
const store = useAccountsStore()
const form = ref<Account>({ ...props.account })
watch(() => props.account, val => (form.value = { ...val }))

const errors = ref({ login: false, password: false })

const labelsString = computed({
  get: () => form.value.labels.map(l => l.text).join('; '),
  set: (value: string) =>
      (form.value.labels = value
          .split(';')
          .map(v => v.trim())
          .filter(Boolean)
          .map(text => ({ text })))
})

function save(field?: FieldTypes) {
  const { isValid, errors: validationErrors } = validateAccount(form.value, field, errors.value)
  errors.value = validationErrors
  if (!isValid) return
  store.update({ ...form.value })
}

watch(() => form.value.type, type => {
  if (type === AccountType.LDAP) {
    form.value.password = null
    errors.value.password = false
  }
})

function remove() {
  store.remove(form.value.id)
}
</script>

<style lang="scss" scoped>
.account-item {
  padding: 16px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  &__actions {
    margin-top: 16px;
    text-align: right;
  }
}
</style>
