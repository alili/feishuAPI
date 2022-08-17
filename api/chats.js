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
const getChats = async function () {
  const url = 'https://open.feishu.cn/open-apis/im/v1/chats'
  const res = await http.get(url)
  return res.data
}

const getMembers = async function () {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/members`
  const res = await http.get(url)

  return res.data
}

const createChats = async function (args) {
  const url = 'https://open.feishu.cn/open-apis/im/v1/chats?user_id_type=user_id&set_bot_manager=true'
  const res = await http.post(url, args)
  return res.data
}

const deleteChats = async function (chat_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}`
  const res = await http.delete(url)

  return res.data
}

const addMembers = async function (chat_id, id_list) {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/members?member_id_type=user_id`
  const res = await http.post(url, {
    id_list,
  })

  return res.data
}

const addManagers = async function (chat_id, manager_ids, type = 'user_id') {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/managers/add_managers?member_id_type=${type}`
  const res = await http.post(url, {
    manager_ids,
  })
}
module.exports = {
  putMessageTop,
  getChats,
  getMembers,
  createChats,
  deleteChats,
  addManagers,
  addMembers,
}
