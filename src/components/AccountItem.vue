<template>
  <el-card class="account-item">
    <el-form :model="form">
      <div class="account-item__grid">
        <el-form-item label="Метки">
          <el-select
              v-model="labelsForSelect"
              multiple
              filterable
              allow-create
              empty-text=""
              :reserve-keyword="false"
              placeholder="tag1; tag2; tag3"
              @change="save(FieldTypes.LABELS)"
          >
            <template #empty />
          </el-select>
        </el-form-item>

        <el-form-item label="Тип">
          <el-select v-model="form.type" @change="save(FieldTypes.TYPE)">
            <el-option label="LDAP" :value="AccountType.LDAP" />
            <el-option label="Локальная" :value="AccountType.LOCAL" />
          </el-select>
        </el-form-item>

        <el-form-item label="Логин *" :error="errors.login ? 'Логин обязателен' : ''">
          <el-input
              v-model="form.login"
              maxlength="100"
              show-word-limit
              @blur="save(FieldTypes.LOGIN)"
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
              @blur="save(FieldTypes.PASSWORD)"
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
import { AccountType, FieldTypes } from '@/types/account'
import { useAccountsStore } from '@/stores/accounts'
import { validateAccount } from '@/utils/validateAccount'

const props = defineProps<{ account: Account }>()
const store = useAccountsStore()

const form = ref<Account>({ ...props.account })
watch(() => props.account, val => (form.value = { ...val }))

const errors = ref({ login: false, password: false })

const labelsForSelect = computed<string[]>({
  get: () => form.value.labels.map(l => l.text),
  set: val => {
    form.value.labels = val.map(text => ({ text }))
  }
})

function save(field?: FieldTypes) {
  const { isValid, errors: validationErrors } = validateAccount(
      form.value,
      field,
      errors.value
  )
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

<style scoped lang="scss">
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
