const bitableAddRecords = async function (app_token, table_id, fields) {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records?user_id_type=user_id`
  try {
    const res = await this.axios.post(url, { fields })
    return res.data
  } catch (error) {
    return error
  }
}
