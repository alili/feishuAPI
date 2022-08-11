const axios = require('axios')
const auth = require('./auth')
const chats = require('./chats')
const message = require('./message')
const user = require('./user')
const image = require('./image')
const event = require('./event')
const bitable = require('./bitable')
module.exports = function (app_id, app_secret) {
  function FAPI(app_id, app_secret) {
    this.app_id = app_id
    this.app_secret = app_secret
    this.axios = axios

    return {
      ...this,
      ...auth,
      ...chats,
      ...message,
      ...user,
      ...image,
      ...event,
      ...bitable,
    }
  }

  return new FAPI(app_id, app_secret)
}
