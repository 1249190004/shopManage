import axios from './axios'

export function users(queryInfo) {
  return axios({
    url: '/users',
    params: {
      query: queryInfo.query,
      pagenum: queryInfo.pagenum,
      pagesize: queryInfo.pagesize
    }
  })
}

export function power(queryInfo) {
  return axios({
    url: '/rights/list'
  })
}

export function role() {
  return axios({
    url: '/roles'
  })
}

export function tree() {
  return axios({
    url:'/rights/tree'
  })
}
// function testPut() {
//   axios.put('http://localhost:3000/posts/3', {"title": "json-server...", "author": "typicode..."})
//     .then(response => {
//       console.log('/posts put', response.data)
//     })
// }

