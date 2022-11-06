const { http } = require('../client')

const addRecords = async function (app_token, table_id, fields) {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records?user_id_type=user_id`
  const res = await http.post(url, { fields })
  return res.data
}

const getRecords = async function (app_token, table_id, page_size, page_token) {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records?user_id_type=user_id&page_size=${page_size}&page_token=${page_token}`
  const res = await http.get(url)

  return res.data
}

module.exports = {
  addRecords,
  getRecords,
}
