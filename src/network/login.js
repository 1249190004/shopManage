import axios from './axios'

export function logins(login) {
  return axios({
    url: '/login',
    params: {
      username: login.username,
      password: login.password
    }
  })
}
