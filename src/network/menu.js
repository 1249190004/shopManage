import axios from './axios'

export function menus() {
  return axios({
    url: '/menus'
  })
}
