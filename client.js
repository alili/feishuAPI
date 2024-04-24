const axios = require('axios')

let indate = 0
let Authorization = ''
// 添加请求拦截器
axios.interceptors.request.use(
  async function (config) {
    if (!/auth/.test(config.url) && indate < new Date().getTime()) {
      token = await getTenantToken()
      setToken(token)
    }
    return config
  },
  function (error) {
    return error
  }
)

const getTenantToken = async function (app_id, app_secret) {
  const url = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'
  const res = await (await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      app_id: app_id || this.app_id,
      app_secret: app_secret || this.app_secret,
    })
  })).json()

  indate = new Date().getTime() + res.expire * 1000
  return res
}

const setToken = function (token) {
  token = token.tenant_access_token
  Authorization = `Bearer ${token}`
}

const client = {
  get: async function (url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization,
      },
    })
  },
  post: async function (url, data) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization,
      },
    })
  },
}

module.exports = {
  getTenantToken,
  setToken,
  http: client,
}
