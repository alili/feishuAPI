const { http } = require('../client')

const send = async function (receive_id, content, msg_type = 'text') {
  const receive_id_type = /^oc/.test(receive_id) ? 'chat_id' : 'user_id'
  const url = `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receive_id_type}`
  const res = await http.post(url, {
    receive_id,
    content: JSON.stringify(content),
    msg_type,
  })

  if (res.data.code !== 0) {
    throw new Error(res.data)
  }

  return res.data.data
}
const updateCard = async function (message_id, card) {
  const url = `https://open.feishu.cn/open-apis/im/v1/messages/${message_id}`
  const res = await http.patch(url, {
    content: JSON.stringify(card),
  })

  return res.data.data
}

const sendEphemeralCard = async function (chat_id, user_id, card) {
  const url = `https://open.feishu.cn/open-apis/ephemeral/v1/send`
  const res = await http.post(url, {
    chat_id,
    user_id,
    msg_type: 'interactive',
    card,
  })
  return res.data
}
const removeEphemeralCard = async function (message_id) {
  const url = `https://open.feishu.cn/open-apis/ephemeral/v1/delete`
  const res = await http.post(url, {
    message_id,
  })
  return res.data
}

const remove = async function (messageId) {
  const url = `https://open.feishu.cn/open-apis/im/v1/messages/${messageId}`
  const res = await http.delete(url)
  return res.data
}

// suger
const sendText = async function (receive_id, text) {
  return await send(receive_id, { text })
}
const sendCard = async function (receive_id, card) {
  return await send(receive_id, card, 'interactive')
}

module.exports = {
  send,
  updateCard,
  remove,
  sendEphemeralCard,
  removeEphemeralCard,
  sendText,
  sendCard,
}
