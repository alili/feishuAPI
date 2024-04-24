const { http } = require('../client')

const getMessage = async function (message_id) {
  const url = `https://open.feishu.cn/open-apis/im/v1/messages/${message_id}`
  const res = await http.get(url)

  return await res.json()
}
const send = async function (receive_id, content, msg_type = 'text') {
  const isWebhook = /https?:\/\//.test(receive_id)

  if (isWebhook) {
    const res = await http.post(receive_id, {
      [msg_type === 'interactive' ? 'card' : 'content']: content,
      msg_type,
    })
    return await res.json().data
  } else {
    const receive_id_type = /^oc/.test(receive_id) ? 'chat_id' : 'user_id'
    const url = `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receive_id_type}`
    const res = await http.post(url, {
      receive_id,
      content: JSON.stringify(msg_type === 'text' ? { text: content } : content),
      msg_type,
    })

    if (res.code !== 0) {
      return await res.json()
    }

    return await res.json().data
  }
}
const updateCard = async function (message_id, card) {
  const url = `https://open.feishu.cn/open-apis/im/v1/messages/${message_id}`
  const res = await http.patch(url, {
    content: JSON.stringify(card),
  })

  return await res.json().data
}

const sendEphemeralCard = async function (chat_id, user_id, card) {
  const url = `https://open.feishu.cn/open-apis/ephemeral/v1/send`
  const res = await http.post(url, {
    chat_id,
    user_id,
    msg_type: 'interactive',
    card,
  })
  return await res.json()
}
const removeEphemeralCard = async function (message_id) {
  const url = `https://open.feishu.cn/open-apis/ephemeral/v1/delete`
  const res = await http.post(url, {
    message_id,
  })
  return await res.json()
}

const remove = async function (messageId) {
  const url = `https://open.feishu.cn/open-apis/im/v1/messages/${messageId}`
  const res = await http.delete(url)
  return await res.json()
}

// sugar
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
  getMessage,
}
