import { useState } from 'react'
import type { FormEvent } from 'react'

interface CityInputProps {
  onSubmit: (city: string) => void
}

export function CityInput({ onSubmit }: CityInputProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="도시 이름을 입력하세요 (예: Seoul)"
        className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      />
      <button
        type="submit"
        className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
      >
        조회
      </button>
    </form>
  )
}
