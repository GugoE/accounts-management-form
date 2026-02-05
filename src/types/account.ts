/** Текстовая метка для аккаунта */
export interface LabelItem {
  text: string
}

/** Тип аккаунта: LDAP или локальный */
export enum AccountType {
  LDAP = 'LDAP',
  LOCAL = 'LOCAL'
}

/** Информация об аккаунте пользователя */
export interface Account {
  /** Уникальный идентификатор аккаунта */
  id: string
  /** Список меток аккаунта */
  labels: LabelItem[]
  /** Тип аккаунта */
  type: AccountType
  /** Логин пользователя */
  login: string
  /** Пароль пользователя (может быть null) */
  password: string | null
}

/** Типы полей аккаунта для валидации или работы с формой */
export enum FieldTypes {
  LOGIN = 'login',
  PASSWORD = 'password',
  LABELS = 'labels',
  TYPE = 'type',
}
