const getTenantToken = async function () {
  const url = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal'
  const res = await this.axios.post(url, {
    app_id: this.app_id,
    app_secret: this.app_secret,
  })
  return res.data
}
const setToken = function (token) {
  this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

module.exports = {
  getTenantToken,
  setToken,
}
