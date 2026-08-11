import { useEffect, useState } from 'react'
import type { Coordinates, WeatherData } from '../types'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export interface WeatherQuery {
  coords?: Coordinates
  city?: string
}

interface WeatherState {
  weather: WeatherData | null
  loading: boolean
  error: string | null
}

export function useWeather(query: WeatherQuery | null) {
  const [state, setState] = useState<WeatherState>({ weather: null, loading: false, error: null })

  useEffect(() => {
    if (!query || (!query.coords && !query.city)) return

    if (!API_KEY) {
      setState({
        weather: null,
        loading: false,
        error: 'OpenWeatherMap API 키가 설정되지 않았어요. .env 파일의 VITE_OPENWEATHER_API_KEY를 확인해주세요.',
      })
      return
    }

    const controller = new AbortController()
    setState((prev) => ({ ...prev, loading: true, error: null }))

    const params = new URLSearchParams({
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    })

    if (query.coords) {
      params.set('lat', String(query.coords.lat))
      params.set('lon', String(query.coords.lon))
    } else if (query.city) {
      params.set('q', query.city)
    }

    fetch(`${BASE_URL}?${params.toString()}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(body?.message ?? `날씨 정보를 가져오지 못했어요 (${res.status})`)
        }
        return res.json()
      })
      .then((data) => {
        setState({
          weather: {
            tempC: Math.round(data.main.temp),
            condition: data.weather[0]?.main ?? 'Clear',
            description: data.weather[0]?.description ?? '',
            cityName: data.name,
            icon: data.weather[0]?.icon ?? '01d',
          },
          loading: false,
          error: null,
        })
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({ weather: null, loading: false, error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요.' })
      })

    return () => controller.abort()
  }, [query?.coords?.lat, query?.coords?.lon, query?.city])

  return state
}
