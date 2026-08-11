import type { MenuItem } from '../types'

interface MenuCardProps {
  menu: MenuItem
  isFavorite: boolean
  onToggleFavorite: () => void
  onReroll: () => void
}

export function MenuCard({ menu, isFavorite, onToggleFavorite, onReroll }: MenuCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
      <p className="text-sm text-slate-400">오늘의 추천 메뉴</p>
      <p className="mt-2 text-6xl">{menu.emoji}</p>
      <h2 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100">{menu.name}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">{menu.category}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{menu.description}</p>

      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`rounded-xl px-4 py-2 text-sm font-medium ring-1 ${
            isFavorite
              ? 'bg-amber-100 text-amber-700 ring-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-700'
              : 'bg-slate-50 text-slate-600 ring-slate-200 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600'
          }`}
        >
          {isFavorite ? '★ 즐겨찾기 됨' : '☆ 즐겨찾기'}
        </button>
        <button
          type="button"
          onClick={onReroll}
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          다른 메뉴 추천
        </button>
      </div>
    </div>
  )
}
