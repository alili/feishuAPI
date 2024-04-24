const stringRandom = require('string-random')
const { http } = require('./client')

let stream_id = ''
let sequence_id = 0

const startStream = async function (speech) {
  let action = stream_id ? 2 : 1
  stream_id = stringRandom(16)
  const url = 'https://open.feishu.cn/open-apis/speech_to_text/v1/speech/stream_recognize'
  const res = await http.post(url, {
    speech,
    config: {
      stream_id,
      sequence_id: sequence_id++,
      action,
      format: 'pcm',
      engine_type: '16k_auto',
    },
  })
  return await res.json().data
}

module.exports = { startStream }
