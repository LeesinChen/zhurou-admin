const TOKEN = 'TOKEN'

export const setToken = (token) => {
  window.localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
  return window.localStorage.getItem(TOKEN)
}
