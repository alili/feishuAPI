const im_message_receive_v1 = function ({ header, event: { message, sender } }, actions) {
  return actions({
    ...message,
    user_id: sender.sender_id.user_id,
    msg: JSON.parse(message.content).text,
    header,
    sender,
  })
}

module.exports = {
  im_message_receive_v1,
}
