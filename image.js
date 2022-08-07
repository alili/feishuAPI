const uploadImage = async (args) => {
  const url = 'https://open.feishu.cn/open-apis/im/v1/images'
  const res = await this.axios.post(url, args)

  return res.data
}

module.exports = {
  uploadImage,
}
