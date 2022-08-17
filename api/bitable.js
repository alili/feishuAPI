const { http } = require('../client')

const addRecords = async function (app_token, table_id, fields) {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records?user_id_type=user_id`
  const res = await http.post(url, { fields })
  return res.data
}

module.exports = {
  addRecords,
}
