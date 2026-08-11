import type { WeatherCondition } from '../types'

export interface WeatherOption {
  key: WeatherCondition
  label: string
}

export const WEATHER_OPTIONS: WeatherOption[] = [
  { key: 'normal', label: '보통' },
  { key: 'hot', label: '더움' },
  { key: 'cold', label: '추움' },
  { key: 'rainy', label: '비 오는 날' },
]
