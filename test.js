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
  const FAPI = FSDK('cli_a1360c412078900c', 'fkwUdGa2HBzqNXD1cgvsCcC37IayFjpR')
  FAPI.setToken((await FAPI.getTenantToken()).tenant_access_token)

  let chats = await FAPI.createChats({
    user_id_list: ['e6288gb4'],
    owner_id: 'e6288gb4',
    name: `test 发起的挑战`,
  })

  console.log(`res:`, chats)
})()
