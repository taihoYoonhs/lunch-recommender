import type { MenuItem } from '../types'

interface FavoritesPanelProps {
  favorites: MenuItem[]
  onRemove: (id: string) => void
}

export function FavoritesPanel({ favorites, onRemove }: FavoritesPanelProps) {
  if (favorites.length === 0) {
    return <p className="text-sm text-slate-400">아직 즐겨찾기한 메뉴가 없어요.</p>
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {favorites.map((menu) => (
        <li
          key={menu.id}
          className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800"
        >
          <span>
            {menu.emoji} {menu.name}
          </span>
          <button
            type="button"
            onClick={() => onRemove(menu.id)}
            aria-label={`${menu.name} 즐겨찾기 제거`}
            className="ml-1 text-amber-500 hover:text-amber-700 dark:text-amber-400"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}
