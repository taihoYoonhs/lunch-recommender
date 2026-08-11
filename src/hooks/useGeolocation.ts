import { useEffect, useState } from 'react'
import type { Coordinates } from '../types'

interface GeolocationState {
  coords: Coordinates | null
  loading: boolean
  error: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState({ coords: null, loading: false, error: '이 브라우저는 위치 정보를 지원하지 않습니다.' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: { lat: position.coords.latitude, lon: position.coords.longitude },
          loading: false,
          error: null,
        })
      },
      (error) => {
        setState({ coords: null, loading: false, error: error.message || '위치 정보를 가져오지 못했습니다.' })
      },
      { timeout: 8000 },
    )
  }, [])

  return state
}
