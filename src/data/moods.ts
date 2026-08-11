import type { MoodKey } from '../types'

export interface MoodOption {
  key: MoodKey
  label: string
}

export const MOOD_OPTIONS: MoodOption[] = [
  { key: 'stress', label: '스트레스 받아서 자극적인 게 필요함' },
  { key: 'comfort', label: '편안하고 익숙한 게 먹고싶음' },
  { key: 'energy', label: '기운 없어서 든든한 보양식이 필요함' },
  { key: 'diet', label: '다이어트 중이라 가볍게' },
  { key: 'hangover', label: '어제 술 마셔서 해장이 필요함' },
  { key: 'adventure', label: '새로운/특별한 메뉴 도전하고 싶음' },
  { key: 'celebration', label: '축하할 일이 있어서 맛있는 거' },
  { key: 'refresh', label: '기분 전환이 필요함' },
  { key: 'quick', label: '시간 없어서 빨리 먹을 수 있는 거' },
  { key: 'leisure', label: '여유롭게 즐기고 싶음' },
  { key: 'filling', label: '배고파서 양 많은 거' },
  { key: 'random', label: '그냥 아무거나 (별생각 없음)' },
  { key: 'sweet', label: '단 게 당김' },
  { key: 'chilled', label: '시원한/차가운 음식이 먹고싶음' },
  { key: 'warmSoup', label: '뜨끈한 국물이 필요함' },
  { key: 'meatCraving', label: '고기가 당김' },
  { key: 'noodleCraving', label: '면 요리가 당김' },
  { key: 'gentle', label: '속이 편안한 음식이 필요함' },
  { key: 'healthy', label: '건강하게 챙겨먹고 싶음' },
  { key: 'greasy', label: '기름지고 든든한 게 당김' },
]
