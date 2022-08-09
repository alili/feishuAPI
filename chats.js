const putMessageTop = async function (chat_id, message_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/top_notice/put_top_notice`
  try {
    const res = await this.axios.post(url, {
      chat_top_notice: [
        {
          action_type: '1',
          message_id,
        },
      ],
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}
const getChats = async function () {
  const url = 'https://open.feishu.cn/open-apis/im/v1/chats'
  const res = await this.axios.get(url)
  return res.data
}

const getMembers = async function () {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/members`
  const res = await this.axios.get(url)

  return res.data
}

const createChats = async function (args) {
  const url = 'https://open.feishu.cn/open-apis/im/v1/chats?user_id_type=user_id&set_bot_manager=true'
  try {
    const res = await this.axios.post(url, args)
    return res.data
  } catch (error) {
    return error
  }
}

const deleteChats = async function (chat_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}`
  const res = await this.axios.delete(url)

  return res.data
}

const addMembers = async function (chat_id, id_list) {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/members?member_id_type=user_id`
  try {
    const res = await this.axios.post(url, {
      id_list,
    })

    return res.data
  } catch (error) {
    return error
  }
}

const addManagers = async function (chat_id, manager_ids, type = 'user_id') {
  const url = `https://open.feishu.cn/open-apis/im/v1/chats/${chat_id}/managers/add_managers?member_id_type=${type}`
  try {
    const res = await this.axios.post(url, {
      manager_ids,
    })
  } catch (error) {
    return error
  }
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
