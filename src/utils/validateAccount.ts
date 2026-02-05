import type { Account } from '@/types/account'
import { FieldTypes } from '@/types/account'
import { AccountType } from '@/types/account'

export function validateAccount(
  account: Account,
  field?: FieldTypes,
  currentErrors?: { login: boolean; password: boolean }
) {
  const errors = currentErrors ? { ...currentErrors } : { login: false, password: false }

  if (!field || field === FieldTypes.LOGIN) {
    errors.login = !account.login.trim()
  }

  if (!field || field === FieldTypes.PASSWORD) {
    errors.password =
      account.type === AccountType.LOCAL ? !account.password?.trim() : false
  }

  return { isValid: !errors.login && !errors.password, errors }
}
