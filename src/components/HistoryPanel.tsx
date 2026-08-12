import type { HistoryEntry, MenuItem } from '../types'

interface HistoryPanelProps {
  history: HistoryEntry[]
  getMenu: (id: string) => MenuItem | undefined
}

export function HistoryPanel({ history, getMenu }: HistoryPanelProps) {
  if (history.length === 0) {
    return <p className="text-sm text-slate-400">아직 추천 기록이 없어요.</p>
  }

  return (
    <ul className="flex flex-col gap-1">
      {history.map((entry) => {
        const menu = getMenu(entry.menuId)
        if (!menu) return null
        return (
          <li
            key={entry.id}
            className="flex items-center justify-between rounded-lg px-2 py-1 text-sm text-slate-600 dark:text-slate-300"
          >
            <span>{menu.name}</span>
            <span className="text-xs text-slate-400">
              {new Date(entry.recommendedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
