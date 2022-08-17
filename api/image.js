const FormData = require('form-data')
const { http } = require('../client')

async function upload({ type, url }) {
  const formData = new FormData()
  let image = await this.axios({
    url: url,
    method: 'get',
    responseType: 'stream',
  })
  formData.append('image', image.data)
  formData.append('image_type', type || 'message')
  const { data: res } = await http.post('https://open.feishu.cn/open-apis/im/v1/images', formData, {
    headers: formData.getHeaders(),
  })
  if (res.code) {
    return false
  }
  return res.data.image_key
}

module.exports = {
  upload,
}
