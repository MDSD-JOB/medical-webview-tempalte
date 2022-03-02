import WebStorageCache from 'web-storage-cache'

const wsCache = new WebStorageCache()
export const setLocalStorage = (key, value) => {
  return wsCache.set(key, value)
}

export const getLocalStorage = key => {
  return wsCache.get(key)
}

export const removeLocalStorage = key => {
  return wsCache.delete(key)
}

export const clearLocalStorage = () => {
  return wsCache.clear()
}

export const getLocale = () => {
  return getLocalStorage('locale')
}

export const saveLocale = locale => {
  return setLocalStorage('locale', locale)
}
