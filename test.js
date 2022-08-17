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
  const elements = FAPI.tools.makeElements([
    '![图片](img_v2_b60e8bed-fb1f-4385-bdc0-e4840f1c59fg)',
    'xxx 向群友发起挑战\n挑战难度为 【easy】',
    '---',
    '报名人数 *7/8*',
    ['text', '报名人数', '*7/8*'],
    ['note', '![图片](img_v2_b60e8bed-fb1f-4385-bdc0-e4840f1c59fg)', '备注消息'],
    [
      'text-image',
      '深度整合使用率极高的办公工具，企业成员在一处即可实现高效沟通与协作。',
      '!b:p[title](http://baidu.com)',
    ],
    ['button', '!b:p[title](http://baidu.com)', '!b:d[title]({ "name": "nemo" })'],
  ])

  console.log(`elements:`, elements)
  let res = await FAPI.message.sendCard('e6288gb4', {
    header: {
      template: 'red',
      title: {
        content: '测试',
        tag: 'plain_text',
      },
    },
    elements,
  })

  console.log(`res:`, res)
  // let chatsList = await FAPI.bitableAddRecords('bascnfHgoh8uXhcwwFxCKJNoCWh', 'tblqDr92aGmkNd8v', [{}])
  // console.log(`chatsList:`, chatsList.data.items)
  // let chats = await FAPI.addManagers('oc_c353527c0a143767715fbfa36138448e', ['cli_a1360c412078900c'], 'app_id')

  // console.log(`res:`, JSON.stringify(chats.response.data))
})()
