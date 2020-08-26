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
    url: '/rights/tree'
  })
}

export function category(queryInfo) {
  return axios({
    url: '/categories',
    params: {
      type: queryInfo.type,
      pagenum: queryInfo.pagenum,
      pagesize: queryInfo.pagesize
    }
  })
}

export function categories() {
  return axios({
    url: '/categories',
    params: {
      type: 2
    }
  })
}

export function CateForm() {
  return axios({
    url: '/categories'
  })
}

export function goods(goodsList) {
  return axios({
    url: '/goods',
    params: {
      query: goodsList.query,
      pagenum: goodsList.pagenum,
      pagesize: goodsList.pagesize
    }
  })
}

export function orders(orderList) {
  return axios({
    url: '/orders',
    params: {
      query: orderList.query,
      pagenum: orderList.pagenum,
      pagesize: orderList.pagesize,
      user_id:orderList.user_id
    }
  })
}

// function testPut() {
//   axios.put('http://localhost:3000/posts/3', {"title": "json-server...", "author": "typicode..."})
//     .then(response => {
//       console.log('/posts put', response.data)
//     })
// }

