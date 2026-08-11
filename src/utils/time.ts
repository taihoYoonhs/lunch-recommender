import type { MealTime } from '../types'

const MEAL_TIME_LABELS: Record<MealTime, string> = {
  breakfast: '아침',
  lunch: '점심',
  snack: '간식',
  dinner: '저녁',
  lateNight: '야식',
}

export function getMealTime(date: Date = new Date()): MealTime {
  const hour = date.getHours()
  if (hour >= 5 && hour < 10) return 'breakfast'
  if (hour >= 10 && hour < 14) return 'lunch'
  if (hour >= 14 && hour < 17) return 'snack'
  if (hour >= 17 && hour < 21) return 'dinner'
  return 'lateNight'
}

export function getMealTimeLabel(mealTime: MealTime): string {
  return MEAL_TIME_LABELS[mealTime]
}
