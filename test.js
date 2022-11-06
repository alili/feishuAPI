const FSDK = require('./index.js')
const sleep = require('sleep')

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
  const FAPI = await FSDK('cli_a27af43160f8d00c', 'etF4fNxZAF7NEVuKA8EzmfrqR27qGnYX')

  const data = await FAPI.bitable.getRecords('bascngugf5wIbODzT0hxtDTl64e', 'tbldt4amzaq6boO2', 500, '')

  const {
    data: { items },
  } = data

  let res = items[Math.floor(Math.random() * items.length)].fields
  await FAPI.message.sendCard('e6288gb4', {
    header: FAPI.tools.makeHeader('red', '今天读这篇内容'),
    elements: FAPI.tools.makeElements([
      `**[标题]**： ${res.标题}`,
      `**[链接]**： [${res.链接.text}](${res.链接.link})`,
      `**[为什么值得你读]**： ${res.推荐语}`,
    ]),
  })
  // https://yellowduck.feishu.cn/base/bascngugf5wIbODzT0hxtDTl64e?table=tbldt4amzaq6boO2&view=vewO3yw2tp
  // const elements = FAPI.tools.makeElements([
  //   '@e6288gb4 向群友发起挑战\n挑战难度为 【easy】',
  //   '---',
  //   ['note', '![图片](img_v2_b60e8bed-fb1f-4385-bdc0-e4840f1c59fg)', '备注消息'],
  //   ['list', '深度整合使用率极高的办公工具，企业成员在一处即可实现高效沟通与协作。', '!b:p[title](http://baidu.com)'],
  //   [
  //     'list',
  //     '深度整合使用率极高的办公工具，企业成员在一处即可实现高效沟通与协作。',
  //     '![图片](img_v2_b60e8bed-fb1f-4385-bdc0-e4840f1c59fg)',
  //   ],
  // ])

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

  // FAPI.event.add('im.message.receive_v1', async (title) => {
  //   console.log(`title:`, 1)
  // })

  // await FAPI.event.listen(body)
})()
