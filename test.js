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
  const FAPI = FSDK('cli_a27ecbb84679900d', '798n7A6QLoPHt7GX5BOwZgZNt33HWEX4')
  FAPI.setToken((await FAPI.getTenantToken()).tenant_access_token)

  let chatsList = await FAPI.bitableAddRecords('bascnfHgoh8uXhcwwFxCKJNoCWh', 'tblqDr92aGmkNd8v', [{}])
  console.log(`chatsList:`, chatsList.data.items)
  // let chats = await FAPI.addManagers('oc_c353527c0a143767715fbfa36138448e', ['cli_a1360c412078900c'], 'app_id')

  // console.log(`res:`, JSON.stringify(chats.response.data))
})()
