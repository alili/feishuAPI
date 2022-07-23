import cloud from '@/cloud-sdk'
import * as FSDK from 'feishu-sdk'
import * as BSDK from 'bilibili-sdk'

const db = cloud.database()

exports.main = async function (ctx: FunctionContext) {
  // body, query 为请求参数, auth 是授权对象
  const { auth, body, query } = ctx
  const {
    header,
    event: { message, sender },
  } = body
  const msg = JSON.parse(message.content).text

  // 飞书事件监听绑定
  if (body.challenge) {
    return {
      challenge: body.challenge,
    }
  }

  // 避免冗余事件
  const _event = header.event_id && (await db.collection('Events').doc(header.event_id).get()).data
  if (_event) {
    return {}
  } else {
    db.collection('Events').doc(header.event_id).set(message)
  }

  // 初始化API
  const FAPI = FSDK('cli_a1360c412078900c', 'n0rYmOKaA6Ve6529rjYqRJdrtlByX2jQ')
  const biliMeta = (await db.collection('Meta').doc('bili').get()).data
  const BAPI = BSDK('15516023', biliMeta.cookies, biliMeta.csrf)

  // 获取缓存token或请求token
  let token = await db.collection('Meta').doc('feishu_token').get()
  if (token.data?.indate > new Date().getTime()) {
    token = token?.data
  } else {
    token = await FAPI.getTenantToken()
    token.indate = new Date().getTime() + token.expire * 1000
    await db.collection('Meta').doc('feishu_token').set(token)
  }
  FAPI.setToken(token.tenant_access_token)

  // 不缓存
  // FAPI.setToken((await FAPI.getTenantToken()).tenant_access_token)

  if (/^:/.test(msg)) {
    let { room_id } = await BAPI.getRoomId(msg.replace(':', ''))
    let roomName = await BAPI.getLiveName(room_id)
    await db.collection('Meta').doc('currentRoom').set({
      room_id,
    })

    let sendMessage = await FAPI.sendTextMessage(sender.sender_id.user_id, `当前直播间：${roomName}(${room_id})`)
    await FAPI.putMessageTop(sendMessage.chat_id, sendMessage.message_id)
  } else {
    const {
      data: { room_id },
    } = await db.collection('Meta').doc('currentRoom').get()

    for (let index = 0; index < msg.length / 20; index++) {
      await BAPI.sendDanmu(room_id, msg.slice(index * 20, (index + 1) * 20))
    }
    return {
      msg,
    }
  }

  return {}
}
