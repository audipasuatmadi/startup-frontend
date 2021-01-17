export const fetchFromStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key)
  if (!!value) return JSON.parse(value)

  return null
}