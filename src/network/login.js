import axios from './axios'

export const BANNER = 'banner'
export const RECOMMEND = 'recommend'


export function logins(login) {
  return axios({
    url: '/login',
    params: {
      username: login.username,
      password: login.password
    }
  })
}
