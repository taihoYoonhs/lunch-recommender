import menusData from '../data/menus.json'
import type { GroupSize, MealTime, MenuItem, MoodKey, WeatherCondition } from '../types'

const menus = menusData as MenuItem[]

const WEATHER_LABELS: Record<WeatherCondition, string> = {
  hot: '더움',
  cold: '추움',
  rainy: '비',
  normal: '보통',
}

export function classifyWeather(tempC: number, condition: string): WeatherCondition {
  const c = condition.toLowerCase()
  if (c.includes('snow')) return 'cold'
  if (c.includes('rain') || c.includes('drizzle') || c.includes('thunderstorm')) return 'rainy'
  if (tempC >= 28) return 'hot'
  if (tempC <= 5) return 'cold'
  return 'normal'
}

export function getWeatherLabel(condition: WeatherCondition): string {
  return WEATHER_LABELS[condition]
}

export function getMenuById(id: string): MenuItem | undefined {
  return menus.find((menu) => menu.id === id)
}

export interface RecommendInput {
  weather: WeatherCondition
  mood: MoodKey
  groupSize: GroupSize
  mealTime: MealTime
  excludeIds?: string[]
}

type FilterKey = 'mood' | 'weather' | 'groupSize' | 'mealTime'

// 후보가 0개일 때 완화(제외)할 조건의 순서 — 사용자가 직접 고른 조건보다
// 자동으로 가져온 고정 조건을 더 오래 지키도록 mood를 가장 먼저 완화한다.
const RELAX_ORDER: FilterKey[] = ['mood', 'weather', 'groupSize', 'mealTime']

export interface RecommendResult {
  menu: MenuItem
  matched: Record<FilterKey, boolean>
  relaxed: FilterKey[]
}

function matchesFilter(menu: MenuItem, input: RecommendInput, ignore: Set<FilterKey>): boolean {
  if (!ignore.has('weather') && !menu.tags.weather.includes(input.weather)) return false
  if (!ignore.has('mood') && !menu.tags.mood.includes(input.mood)) return false
  if (!ignore.has('groupSize') && !menu.tags.groupSize.includes(input.groupSize)) return false
  if (!ignore.has('mealTime') && !menu.tags.mealTime.includes(input.mealTime)) return false
  return true
}

export function recommendMenu(input: RecommendInput): RecommendResult {
  const excludeIds = input.excludeIds ?? []
  const ignore = new Set<FilterKey>()

  for (let step = 0; step <= RELAX_ORDER.length; step++) {
    const candidates = menus.filter((menu) => matchesFilter(menu, input, ignore))
    const fresh = candidates.filter((menu) => !excludeIds.includes(menu.id))
    const pool = fresh.length > 0 ? fresh : candidates

    if (pool.length > 0) {
      const menu = pool[Math.floor(Math.random() * pool.length)]
      return {
        menu,
        matched: {
          weather: menu.tags.weather.includes(input.weather),
          mood: menu.tags.mood.includes(input.mood),
          groupSize: menu.tags.groupSize.includes(input.groupSize),
          mealTime: menu.tags.mealTime.includes(input.mealTime),
        },
        relaxed: [...ignore],
      }
    }

    if (step < RELAX_ORDER.length) ignore.add(RELAX_ORDER[step])
  }

  // menus가 비어 있지 않다면 마지막 단계(조건 전부 무시)에서 항상 후보가 남으므로 도달하지 않는다.
  const fallback = menus[Math.floor(Math.random() * menus.length)]
  return {
    menu: fallback,
    matched: { weather: false, mood: false, groupSize: false, mealTime: false },
    relaxed: RELAX_ORDER,
  }
}

const MOOD_REASONS: Record<MoodKey, string> = {
  stress: '스트레스엔 자극적인 메뉴가 필요하니까',
  comfort: '편안하고 익숙한 음식이 생각날 때라서',
  energy: '든든한 보양식이 필요한 타이밍이라서',
  diet: '가볍게 먹고 싶은 기분에 맞춰서',
  hangover: '해장이 필요한 상태라서',
  adventure: '새로운 메뉴에 도전하고 싶은 기분이라서',
  celebration: '축하할 일엔 역시 맛있는 게 필요하니까',
  refresh: '기분 전환이 필요한 순간이라서',
  quick: '빨리 먹을 수 있는 메뉴가 필요해서',
  leisure: '여유롭게 즐기고 싶은 기분에 맞춰서',
  filling: '배고플 땐 역시 양 많은 메뉴가 필요하니까',
  random: '그냥 아무거나 먹고 싶은 기분이라서',
  sweet: '단 게 당기는 순간이라서',
  chilled: '시원한 음식이 생각나는 날이라서',
  warmSoup: '뜨끈한 국물이 필요한 날이라서',
}

const WEATHER_REASONS: Record<WeatherCondition, string> = {
  hot: '더운 날씨엔 이만한 게 없어서',
  cold: '추운 날씨에 어울리는 메뉴라서',
  rainy: '비 오는 날엔 이 메뉴가 생각나서',
  normal: '무난하게 즐기기 좋은 날씨라서',
}

const MEAL_TIME_REASONS: Record<MealTime, string> = {
  breakfast: '아침 시간대에 든든하게 챙기기 좋아서',
  lunch: '점심 시간대에 딱 맞는 메뉴라서',
  snack: '간식 시간대에 즐기기 좋아서',
  dinner: '저녁 시간대에 어울리는 메뉴라서',
  lateNight: '야식으로 딱이라서',
}

export function getRecommendReason(input: RecommendInput, result: RecommendResult): string {
  const phrases: string[] = []
  if (result.matched.mood) phrases.push(MOOD_REASONS[input.mood])
  if (result.matched.weather) phrases.push(WEATHER_REASONS[input.weather])
  if (result.matched.mealTime) phrases.push(MEAL_TIME_REASONS[input.mealTime])
  if (result.matched.groupSize && phrases.length < 2) {
    phrases.push(`${input.groupSize === '7+' ? '7명 이상' : `${input.groupSize}명`}이 먹기에도 좋아서`)
  }

  if (phrases.length === 0) {
    return '딱 맞는 조건은 없었지만, 그래도 이 메뉴가 어울릴 것 같아서 골라봤어요.'
  }

  return `${phrases.slice(0, 2).join(' + ')} 추천했어요.`
}
