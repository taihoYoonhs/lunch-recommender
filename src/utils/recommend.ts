import menusData from '../data/menus.json'
import type { MenuItem, WeatherCondition } from '../types'

const menus = menusData as MenuItem[]

export function classifyWeather(tempC: number, condition: string): WeatherCondition {
  const c = condition.toLowerCase()
  if (c.includes('snow')) return 'snow'
  if (c.includes('rain') || c.includes('drizzle') || c.includes('thunderstorm')) return 'rainy'
  if (tempC >= 28) return 'hot'
  if (tempC <= 5) return 'cold'
  return 'mild'
}

export function getMenuById(id: string): MenuItem | undefined {
  return menus.find((menu) => menu.id === id)
}

export function recommendMenu(condition: WeatherCondition, excludeIds: string[] = []): MenuItem {
  const matching = menus.filter((menu) => menu.tags.includes(condition))
  const pool = matching.length > 0 ? matching : menus
  const fresh = pool.filter((menu) => !excludeIds.includes(menu.id))
  const finalPool = fresh.length > 0 ? fresh : pool
  return finalPool[Math.floor(Math.random() * finalPool.length)]
}
