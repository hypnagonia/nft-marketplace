export const cache = (storeName: string) => {
  return {
    get: data => {
      console.log('get cache')
      const store = window.localStorage.getItem(storeName);
      if (!store) {
        return null
      }

      return JSON.parse(store)[data]
    },
    set: (key, data) => {
      const store = JSON.parse(window.localStorage.getItem(storeName)) || {}
      const payload = JSON.stringify({...store, [key]: data})

      window.localStorage.setItem(storeName, payload)
    },
    getAll: () => {
      console.log('get cache all')
      const store = window.localStorage.getItem(storeName) || '{}';
      return JSON.parse(store)
    }
  }
}