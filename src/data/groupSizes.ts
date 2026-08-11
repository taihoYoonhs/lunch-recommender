import type { GroupSize } from '../types'

export interface GroupSizeOption {
  key: GroupSize
  label: string
}

export const GROUP_SIZE_OPTIONS: GroupSizeOption[] = [
  { key: '1', label: '1명' },
  { key: '2', label: '2명' },
  { key: '3', label: '3명' },
  { key: '4', label: '4명' },
  { key: '5', label: '5명' },
  { key: '6', label: '6명' },
  { key: '7+', label: '7명 이상' },
]
