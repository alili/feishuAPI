const events = {}
const keywords = {}

const add = function (type, fun) {
  events[type] = fun
}

const listen = async function ({ header, event: { message, sender } } = {}, channel = '') {
  if (header.event_type === 'im.message.receive_v1') {
    const msg = JSON.parse(message.content).text

    let event = Object.entries(keywords).find(([keyword]) => new RegExp(keyword).test(msg))
    if (event) {
      return await event[1](...new RegExp(event[0]).exec(msg).slice(1))
    }
  }
  return await events[channel || header.event_type]({ header, event: { message, sender } })
}

const keyword = async function (keyword, fun) {
  keywords[keyword] = fun
}

module.exports = {
  add,
  listen,
  keyword,
}
