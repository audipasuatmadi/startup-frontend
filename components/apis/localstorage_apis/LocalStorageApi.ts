export const fetchFromStorage = (key: string): string | null => {
  const value = localStorage.getItem(key)
  if (!!value) return value

  return null
}