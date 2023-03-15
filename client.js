const axios = require('axios')

let indate = 0
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

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return error.response
  }
)

const getTenantToken = async function (app_id, app_secret) {
  console.log(`res:`, app_id, app_secret)
  const url = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'
  const res = await axios.post(url, {
    app_id: app_id || this.app_id,
    app_secret: app_secret || this.app_secret,
  })
  indate = new Date().getTime() + res.data.expire * 1000
  return res.data
}

const setToken = function (token) {
  token = token.tenant_access_token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

module.exports = {
  getTenantToken,
  setToken,
  http: axios,
}
