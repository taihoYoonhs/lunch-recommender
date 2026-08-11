import type { MenuItem } from '../types'

const CATEGORY_EMOJI: Record<string, string> = {
  한식: '🍚',
  중식: '🥢',
  일식: '🍣',
  양식: '🍝',
  기타: '🍽️',
}

interface MenuCardProps {
  menu: MenuItem
  reason: string
  isFavorite: boolean
  onToggleFavorite: () => void
  onReroll: () => void
}

export function MenuCard({ menu, reason, isFavorite, onToggleFavorite, onReroll }: MenuCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
      <p className="text-sm text-slate-400">오늘의 추천 메뉴</p>
      <p className="mt-2 text-6xl">{CATEGORY_EMOJI[menu.category] ?? '🍽️'}</p>
      <h2 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100">{menu.name}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">{menu.category}</p>

      <div className="mt-3 flex justify-center gap-2 text-xs">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {menu.tags.price}
        </span>
        {menu.tags.spicy && (
          <span className="rounded-full bg-red-100 px-2 py-1 text-red-600 dark:bg-red-900/40 dark:text-red-300">
            🌶️ 매운맛
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{reason}</p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`rounded-xl px-4 py-2 text-sm font-medium ring-1 ${
            isFavorite
              ? 'bg-amber-100 text-amber-700 ring-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-700'
              : 'bg-slate-50 text-slate-600 ring-slate-200 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600'
          }`}
        >
          {isFavorite ? '★ 즐겨찾기 취소' : '☆ 즐겨찾기 추가'}
        </button>
        <button
          type="button"
          onClick={onReroll}
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          다시 추천받기
        </button>
      </div>
    </div>
  )
}
