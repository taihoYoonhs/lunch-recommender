export type WeatherCondition = 'hot' | 'cold' | 'rainy' | 'normal'

export type MoodKey =
  | 'stress'
  | 'comfort'
  | 'energy'
  | 'diet'
  | 'hangover'
  | 'adventure'
  | 'celebration'
  | 'refresh'
  | 'quick'
  | 'leisure'
  | 'filling'
  | 'random'
  | 'sweet'
  | 'chilled'
  | 'warmSoup'

export type GroupSize = '1' | '2' | '3' | '4' | '5' | '6' | '7+'

export type MealTime = 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'lateNight'

export type PriceLevel = '저가' | '중가' | '고가'

export interface MenuTags {
  weather: WeatherCondition[]
  mood: MoodKey[]
  groupSize: GroupSize[]
  mealTime: MealTime[]
  spicy: boolean
  price: PriceLevel
}

export interface MenuItem {
  id: string
  name: string
  category: string
  tags: MenuTags
}

export interface HistoryEntry {
  menuId: string
  recommendedAt: number
}
