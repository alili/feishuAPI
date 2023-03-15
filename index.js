const client = require('./client')

// api
const chats = require('./api/chats')
const message = require('./api/message')
const user = require('./api/user')
const image = require('./api/image')
const event = require('./api/event')
const bitable = require('./api/bitable')
const spreadsheets = require('./api/spreadsheets')

// tools
const tools = require('./tools')

module.exports = async function (app_id, app_secret, config = {}) {
  let token
  if (!config.noCache) {
    token = await client.getTenantToken(app_id, app_secret)
  }
  function FAPI(app_id, app_secret) {
    this.app_id = app_id
    this.app_secret = app_secret

    if (!config.noCache) {
      client.setToken(token)
    }

    return {
      ...this,
      ...client,
      chats,
      message,
      user,
      image,
      event,
      bitable,
      spreadsheets,
      tools,
    }
  }

  return new FAPI(app_id, app_secret)
}

module.exports.tools = tools
