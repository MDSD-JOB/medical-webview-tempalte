import Cookies from 'js-cookie'

const inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000)

const getCookie = name => {
  return Cookies.get(name)
}

const setCookie = (name, val, expires = inFifteenMinutes) => {
  return Cookies.set(name, val, expires)
}

const delCookie = name => {
  return Cookies.remove(name)
}

export { getCookie, setCookie, delCookie }
