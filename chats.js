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
const getCharts = async function () {
  const url = 'https://open.feishu.cn/open-apis/im/v1/chats'
  const res = await this.axios.get(url)
  return res.data
}

module.exports = {
  putMessageTop,
  getCharts,
}
