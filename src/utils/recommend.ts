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

function scoreMenu(menu: MenuItem, input: RecommendInput): number {
  let score = 0
  if (menu.tags.mood.includes(input.mood)) score += 4
  if (menu.tags.weather.includes(input.weather)) score += 3
  if (menu.tags.groupSize.includes(input.groupSize)) score += 2
  if (menu.tags.mealTime.includes(input.mealTime)) score += 1
  return score
}

export function recommendMenu(input: RecommendInput): MenuItem {
  const scored = menus.map((menu) => ({ menu, score: scoreMenu(menu, input) }))
  const maxScore = Math.max(...scored.map((s) => s.score))
  const candidates = scored.filter((s) => s.score === maxScore).map((s) => s.menu)

  const excludeIds = input.excludeIds ?? []
  const fresh = candidates.filter((menu) => !excludeIds.includes(menu.id))
  const pool = fresh.length > 0 ? fresh : candidates

  return pool[Math.floor(Math.random() * pool.length)]
}
