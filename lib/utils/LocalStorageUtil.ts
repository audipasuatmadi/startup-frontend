export const setLocalStorageData = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value)
}

export const getLocalStorageData = (key: string): string | null => {
  if (typeof window === 'undefined') return;
  return localStorage.getItem(key)
}

export const removeLocalStorgeData = (key: string) => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key)
}