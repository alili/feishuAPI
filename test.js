const FSDK = require('./index.js')
const dayjs = require('dayjs')

const makeQuestionCard = function ({ question, submit, acRate, tags, questionName, question_id, title }) {
  return {
    config: {
      wide_screen_mode: true,
    },
    elements: [
      {
        tag: 'markdown',
        content: question,
      },
      {
        tag: 'hr',
      },
      {
        tag: 'div',
        fields: [
          {
            is_short: true,
            text: {
              tag: 'lark_md',
              content: `**提交：**${submit}`,
            },
          },
          {
            is_short: true,
            text: {
              tag: 'lark_md',
              content: `**通过率：**${acRate}%`,
            },
          },
        ],
      },
      {
        tag: 'markdown',
        content: `**标签：** ${tags}`,
      },
      {
        tag: 'markdown',
        content: `[题目链接](https://leetcode.cn/problems/${questionName}/)`,
      },
    ],
    header: {
      template: 'red',
      title: {
        content: `【${dayjs().format('MM月DD日')}】${question_id}.${title}`,
        tag: 'plain_text',
      },
    },
  }
}
;(async () => {
  const FAPI = await FSDK('cli_a2609958b8f9900b', 'P0E6uiiO8KwcVpl9PHhl7ef7GUknEzvW')
  const body = {
    schema: '2.0',
    header: {
      event_id: '5e3702a84e847582be8db7fb73283c02',
      event_type: 'im.message.receive_v1',
      create_time: '1608725989000',
      token: 'rvaYgkND1GOiu5MM0E1rncYC6PLtF7JV',
      app_id: 'cli_9f5343c580712544',
      tenant_key: '2ca1d211f64f6438',
    },
    event: {
      sender: {
        sender_id: {
          union_id: 'on_8ed6aa67826108097d9ee143816345',
          user_id: 'e33ggbyz',
          open_id: 'ou_84aad35d084aa403a838cf73ee18467',
        },
        sender_type: 'user',
        tenant_key: '736588c9260f175e',
      },
      message: {
        message_id: 'om_5ce6d572455d361153b7cb51da133945',
        root_id: 'om_5ce6d572455d361153b7cb5xxfsdfsdfdsf',
        parent_id: 'om_5ce6d572455d361153b7cb5xxfsdfsdfdsf',
        create_time: '1609073151345',
        chat_id: 'oc_5ce6d572455d361153b7xx51da133945',
        chat_type: 'group',
        message_type: 'text',
        content: '{"text":"tedst 12s3"}',
        mentions: [
          {
            key: '@_user_1',
            id: {
              union_id: 'on_8ed6aa67826108097d9ee143816345',
              user_id: 'e33ggbyz',
              open_id: 'ou_84aad35d084aa403a838cf73ee18467',
            },
            name: 'Tom',
            tenant_key: '736588c9260f175e',
          },
        ],
      },
    },
  }
  const elements = FAPI.tools.makeElements([
    '@e6288gb4 向群友发起挑战\n挑战难度为 【easy】',
    '---',
    ['note', '![图片](img_v2_b60e8bed-fb1f-4385-bdc0-e4840f1c59fg)', '备注消息'],
    ['list', '深度整合使用率极高的办公工具，企业成员在一处即可实现高效沟通与协作。', '!b:p[title](http://baidu.com)'],
    [
      'list',
      '深度整合使用率极高的办公工具，企业成员在一处即可实现高效沟通与协作。',
      '![图片](img_v2_b60e8bed-fb1f-4385-bdc0-e4840f1c59fg)',
    ],
  ])

  // console.log(`elements:`, elements)
  // let res = await FAPI.message.sendCard('oc_0f8a7eda0d141bf9bca603b1240a2879', {
  //   header: {
  //     template: 'red',
  //     title: {
  //       content: '测试',
  //       tag: 'plain_text',
  //     },
  //   },
  //   elements,
  // })

  FAPI.event.keyword('test (.*)', async (title) => {
    console.log(`title:`, title)
  })
  FAPI.event.keyword('(.*)', async (title) => {
    console.log(`title2:`, title)
  })

  await FAPI.event.listen(body)
})()
