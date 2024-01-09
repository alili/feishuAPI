const { http } = require('../client')

const addRecords = async function (app_token, table_id, fields) {
  const recordURL = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records?user_id_type=user_id`
  const recordsURL = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records/batch_create?user_id_type=user_id`

  if (Array.isArray(fields)) {
    const res = await http.post(recordsURL, {
      records: fields.map((fields) => ({
        fields,
      })),
    })
    return res.data
  } else {
    const res = await http.post(recordURL, { fields })
    return res.data
  }
}

const getRecords = async function (app_token, table_id, page_size, page_token='') {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records?user_id_type=user_id&page_size=${page_size}&page_token=${page_token}`
  const res = await http.get(url)

  return res.data
}

const updateRecords = async function (app_token, table_id, record_id, fields) {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records/${record_id}?user_id_type=user_id`
  const res = await http.put(url, { fields })

  return res.data
}
const addFields = async function (app_token, table_id, options) {
  if (!Array.isArray(options)) options = [options]

  for (const option of options) {
    const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/fields`
    const res = await http.post(url, option)
  }

  return true
}

module.exports = {
  addRecords,
  getRecords,
  addFields,
  updateRecords,
}
