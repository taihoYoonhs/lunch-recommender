import { useMemo, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getMenuById, getRecommendReason, recommendMenu } from './utils/recommend'
import { getMealTime, getMealTimeLabel } from './utils/time'
import { MOOD_OPTIONS } from './data/moods'
import { GROUP_SIZE_OPTIONS } from './data/groupSizes'
import { WEATHER_OPTIONS } from './data/weatherOptions'
import { MenuCard } from './components/MenuCard'
import { FavoritesPanel } from './components/FavoritesPanel'
import { HistoryPanel } from './components/HistoryPanel'
import { SelectField } from './components/SelectField'
import type { GroupSize, HistoryEntry, MenuItem, MoodKey, WeatherCondition } from './types'

const HISTORY_LIMIT = 10
const RECENT_EXCLUDE_COUNT = 5

interface Recommendation {
  menu: MenuItem
  reason: string
}

function App() {
  const [weather, setWeather] = useState<WeatherCondition>('normal')
  const [mood, setMood] = useState<MoodKey>('random')
  const [groupSize, setGroupSize] = useState<GroupSize>('1')
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [favorites, setFavorites] = useLocalStorage<MenuItem[]>('lunch-favorites', [])
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('lunch-history', [])

  const mealTime = useMemo(() => getMealTime(), [])

  function handleRecommend() {
    const recentIds = history.slice(0, RECENT_EXCLUDE_COUNT).map((entry) => entry.menuId)
    const input = { weather, mood, groupSize, mealTime, excludeIds: recentIds }
    const result = recommendMenu(input)
    setRecommendation({ menu: result.menu, reason: getRecommendReason(input, result) })
    const entryId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setHistory((prev) => [{ id: entryId, menuId: result.menu.id, recommendedAt: Date.now() }, ...prev].slice(0, HISTORY_LIMIT))
  }

  function toggleFavorite(menu: MenuItem) {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === menu.id)
        ? prev.filter((fav) => fav.id !== menu.id)
        : [...prev, menu],
    )
  }

  const isCurrentFavorite = recommendation ? favorites.some((fav) => fav.id === recommendation.menu.id) : false

  function handleClearFavorites() {
    if (favorites.length === 0) return
    if (window.confirm('즐겨찾기를 모두 삭제할까요?')) setFavorites([])
  }

  function handleClearHistory() {
    if (history.length === 0) return
    if (window.confirm('최근 추천 기록을 모두 삭제할까요?')) setHistory([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-slate-100 px-4 py-10 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">오늘 뭐 먹지?</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            지금은 {getMealTimeLabel(mealTime)} 시간대예요 · 날씨와 기분, 인원수를 골라주세요
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <SelectField label="오늘 날씨는 어때요?" value={weather} options={WEATHER_OPTIONS} onChange={setWeather} />
          <SelectField label="오늘의 기분" value={mood} options={MOOD_OPTIONS} onChange={setMood} />
          <SelectField label="인원수" value={groupSize} options={GROUP_SIZE_OPTIONS} onChange={setGroupSize} />

          <button
            type="button"
            onClick={handleRecommend}
            className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            메뉴 추천받기
          </button>
        </section>

        {recommendation && (
          <MenuCard
            menu={recommendation.menu}
            reason={recommendation.reason}
            isFavorite={isCurrentFavorite}
            onToggleFavorite={() => toggleFavorite(recommendation.menu)}
            onReroll={handleRecommend}
          />
        )}

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300">즐겨찾기</h2>
            {favorites.length > 0 && (
              <button
                type="button"
                onClick={handleClearFavorites}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                초기화
              </button>
            )}
          </div>
          <FavoritesPanel favorites={favorites} onRemove={(id) => setFavorites((prev) => prev.filter((fav) => fav.id !== id))} />
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300">최근 추천 기록</h2>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                초기화
              </button>
            )}
          </div>
          <HistoryPanel history={history} getMenu={getMenuById} />
        </section>
      </div>
    </div>
  )
}

export default App
