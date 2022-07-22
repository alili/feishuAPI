const sendTextMessage = async function (receive_id, text) {
  const url = 'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=user_id'
  let res = await this.axios.post(url, {
    receive_id,
    content: JSON.stringify({ text }),
    msg_type: 'text',
  })
  return res.data.data
}
const sendMessage = async function (receive_id, content, msg_type = 'text') {
  const receive_id_type = /^oc/.test(receive_id) ? 'chat_id' : 'user_id'
  const url = `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receive_id_type}`
  const res = await this.axios.post(url, {
    receive_id,
    content: JSON.stringify(content),
    msg_type,
  })
}
const deleteMessage = async function (messageId) {
  const url = `https://open.feishu.cn/open-apis/im/v1/messages/${messageId}`
  const res = await this.axios.delete(url)
  return res.data
}

module.exports = {
  sendTextMessage,
  sendMessage,
  deleteMessage,
}
