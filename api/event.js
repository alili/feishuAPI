const events = {}

const add = async function (type, fun) {
  events[type] = fun
}

const listen = async function (actions) {
  return await events[actions]()
}

module.exports = {
  add,
  listen,
}
