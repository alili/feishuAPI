const { http } = require('../client')

const getInfo = async function (user_id, user_id_type = 'user_id', department_id_type = 'department_id') {
  const url = `https://open.feishu.cn/open-apis/contact/v3/users/${user_id}`
  const res = await http.get(url, {
    params: {
      user_id_type,
      department_id_type,
    },
  })
  return await res.json()
}

const update = async function (user_id, data, user_id_type = 'user_id', department_id_type = 'department_id') {
  const url = `https://open.feishu.cn/open-apis/contact/v3/users/${user_id}`
  const res = await http.patch(url, data, {
    params: {
      user_id_type,
      department_id_type,
    },
  })

  return await res.json()
}

module.exports = {
  getInfo,
  update,
}
