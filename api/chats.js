const { http } = require('../client')

const putMessageTop = async function (chat_id, message_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/top_notice/put_top_notice`
  const res = await http.post(url, {
    chat_top_notice: [
      {
        action_type: '1',
        message_id,
      },
    ],
  })
  return res.data
}

const pin = async function (message_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/pins`
  const res = await http.post(url, {
    message_id,
  })
  return res.data
}

const unpin = async function (message_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/pins/${message_id}`
  const res = await http.delete(url)

  return res.data
}

const get = async function () {
  const url = 'https://open.feishu.cn/open-apis/im/v1/chats'
  const res = await http.get(url)
  return res.data
}

const getMembers = async function () {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/members`
  const res = await http.get(url)

  return res.data
}

const create = async function (args) {
  const url = 'https://open.feishu.cn/open-apis/im/v1/chats?user_id_type=user_id&set_bot_manager=true'
  const res = await http.post(url, args)
  return res.data
}

const remove = async function (chat_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}`
  const res = await http.delete(url)

  return res.data
}

const addMembers = async function (chat_id, id_list, type = 'user_id') {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/members?member_id_type=${type}`
  const res = await http.post(url, {
    id_list,
  })

  return res.data
}
const removeMembers = async function (chat_id, id_list, type = 'user_id') {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/members?member_id_type=${type}`
  const res = await http.delete(url, {
    id_list,
  })

  return res.data
}

const addManagers = async function (chat_id, manager_ids, type = 'user_id') {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/managers/add_managers?member_id_type=${type}`
  const res = await http.post(url, {
    manager_ids,
  })

  return res.data
}

// sugar
const moveMembers = async function (from, to, id_list, type = 'user_id') {
  return await Promise.all([addMembers(to, id_list, type), removeMembers(from, id_list, type)])
}

module.exports = {
  create,
  get,
  remove,
  putMessageTop,
  getMembers,
  addManagers,
  addMembers,
  removeMembers,
  moveMembers,
  pin,
  unpin,
}
