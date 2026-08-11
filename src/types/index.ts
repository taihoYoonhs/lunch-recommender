export interface Coordinates {
  lat: number
  lon: number
}

export type WeatherCondition = 'hot' | 'cold' | 'rainy' | 'snow' | 'mild'

export interface WeatherData {
  tempC: number
  condition: string
  description: string
  cityName: string
  icon: string
}

export interface MenuItem {
  id: string
  name: string
  category: string
  emoji: string
  description: string
  tags: WeatherCondition[]
}

export interface HistoryEntry {
  menuId: string
  recommendedAt: number
}
