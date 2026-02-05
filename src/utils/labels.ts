import type { LabelItem } from '@/types/account'

export function parseLabels(value: string): LabelItem[] {
  return value
    .split(';')
    .map(v => v.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}

export function stringifyLabels(labels: LabelItem[]): string {
  return labels.map(l => l.text).join('; ')
}
