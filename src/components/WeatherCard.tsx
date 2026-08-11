import type { WeatherData } from '../types'

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800/70 dark:ring-slate-700">
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="h-16 w-16"
      />
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{weather.cityName}</p>
        <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{weather.tempC}°C</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{weather.description}</p>
      </div>
    </div>
  )
}
