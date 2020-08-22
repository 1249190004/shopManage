import originAxios from 'axios'

export default function axios(option) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: 'http://timemeetyou.com:8889/api/private/v1',
      timeout: 5000
    });

    instance.interceptors.request.use(config => {
      // NProgress.start()
      config.headers.Authorization = window.sessionStorage.getItem('token')
      return config
    }, err => {
      return err
    })

    instance.interceptors.response.use(response => {
      return response.data
    }, err => {
      console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权的访问'
            break
        }
      }
      return err
    })

    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
