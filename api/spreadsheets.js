const { http } = require('../client')

const querySpreadsheet = async function (spreadsheet_token) {
  const url = `	
  https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/${spreadsheet_token}/sheets/query`
  const res = await http.get(url)
  return res.data
}
const querySheet = async function (spreadsheet_token, sheet_id) {
  const url = `	
  https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/${spreadsheet_token}/sheets/${sheet_id}`
  const res = await http.get(url)
  return res.data
}

const pushSpreadsheet = async function (spreadsheet_token, range, values) {
  const url = `https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/${spreadsheet_token}/values_prepend`
  const res = await http.post(url, {
    valueRange: {
      range,
      values,
    },
  })

  return res.data
}

module.exports = {
  querySpreadsheet,
  querySheet,
  pushSpreadsheet,
}
