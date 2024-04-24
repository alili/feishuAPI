const { http } = require('../client')

const getTenantToken = async function () {
  const url = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'
  const res = await http.post(url, {
    app_id: this.app_id,
    app_secret: this.app_secret,
  })
  return await res.json()
}
const setToken = function (token) {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

module.exports = {
  getTenantToken,
  setToken,
}
