import { useMemo, useState } from 'react'
import { useGeolocation } from './hooks/useGeolocation'
import { useWeather } from './hooks/useWeather'
import { useLocalStorage } from './hooks/useLocalStorage'
import { classifyWeather, getMenuById, getRecommendReason, getWeatherLabel, recommendMenu } from './utils/recommend'
import { getMealTime, getMealTimeLabel } from './utils/time'
import { MOOD_OPTIONS } from './data/moods'
import { GROUP_SIZE_OPTIONS } from './data/groupSizes'
import { WeatherCard } from './components/WeatherCard'
import { CityInput } from './components/CityInput'
import { MenuCard } from './components/MenuCard'
import { FavoritesPanel } from './components/FavoritesPanel'
import { HistoryPanel } from './components/HistoryPanel'
import { SelectField } from './components/SelectField'
import type { GroupSize, HistoryEntry, MenuItem, MoodKey } from './types'

const HISTORY_LIMIT = 10
const RECENT_EXCLUDE_COUNT = 5

interface Recommendation {
  menu: MenuItem
  reason: string
}

function App() {
  const geo = useGeolocation()
  const [manualCity, setManualCity] = useState<string | null>(null)
  const [mood, setMood] = useState<MoodKey>('random')
  const [groupSize, setGroupSize] = useState<GroupSize>('1')
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [favorites, setFavorites] = useLocalStorage<MenuItem[]>('lunch-favorites', [])
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('lunch-history', [])

  const mealTime = useMemo(() => getMealTime(), [])

  const weatherQuery = geo.coords
    ? { coords: geo.coords }
    : manualCity
      ? { city: manualCity }
      : null

  const { weather, loading: weatherLoading, error: weatherError } = useWeather(weatherQuery)

  const condition = useMemo(() => {
    if (!weather) return null
    return classifyWeather(weather.tempC, weather.condition)
  }, [weather])

  const needsManualCity = !geo.loading && !geo.coords && !manualCity

  function handleRecommend() {
    if (!condition) return
    const recentIds = history.slice(0, RECENT_EXCLUDE_COUNT).map((entry) => entry.menuId)
    const input = { weather: condition, mood, groupSize, mealTime, excludeIds: recentIds }
    const result = recommendMenu(input)
    setRecommendation({ menu: result.menu, reason: getRecommendReason(input, result) })
    setHistory((prev) => [{ menuId: result.menu.id, recommendedAt: Date.now() }, ...prev].slice(0, HISTORY_LIMIT))
  }

  function toggleFavorite(menu: MenuItem) {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === menu.id)
        ? prev.filter((fav) => fav.id !== menu.id)
        : [...prev, menu],
    )
  }

  const isCurrentFavorite = recommendation ? favorites.some((fav) => fav.id === recommendation.menu.id) : false

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-slate-100 px-4 py-10 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">오늘 뭐 먹지?</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">날씨, 시간대, 기분에 딱 맞는 메뉴를 추천해드려요</p>
        </header>

        <section>
          {geo.loading && <p className="text-center text-sm text-slate-400">위치 확인 중...</p>}

          {needsManualCity && (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {geo.error ?? '위치 정보를 사용할 수 없어요.'} 도시를 직접 입력해주세요.
              </p>
              <CityInput onSubmit={setManualCity} />
            </div>
          )}

          {weatherLoading && <p className="text-center text-sm text-slate-400">날씨 조회 중...</p>}

          {weatherError && (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-red-500">{weatherError}</p>
              {geo.coords && <CityInput onSubmit={setManualCity} />}
            </div>
          )}

          {weather && condition && (
            <WeatherCard
              weather={weather}
              conditionLabel={getWeatherLabel(condition)}
              mealTimeLabel={getMealTimeLabel(mealTime)}
            />
          )}
        </section>

        {weather && (
          <section className="flex flex-col gap-3">
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
        )}

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
          <h2 className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">즐겨찾기</h2>
          <FavoritesPanel favorites={favorites} onRemove={(id) => setFavorites((prev) => prev.filter((fav) => fav.id !== id))} />
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300">최근 추천 기록</h2>
          <HistoryPanel history={history} getMenu={getMenuById} />
        </section>
      </div>
    </div>
  )
}

export default App
