interface SelectFieldProps<T extends string> {
  label: string
  value: T
  options: { key: T; label: string }[]
  onChange: (value: T) => void
}

export function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-orange-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
