const axios = require('axios')
const auth = require('./auth')
const chats = require('./chats')
const message = require('./message')

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
    }
  }

  return new FAPI(app_id, app_secret)
}
