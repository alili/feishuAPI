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
  const FAPI = FSDK('cli_a2609958b8f9900b', 'P0E6uiiO8KwcVpl9PHhl7ef7GUknEzvW')
  FAPI.setToken((await FAPI.getTenantToken()).tenant_access_token)

  let res = await FAPI.sendMessage(
    'oc_f55f0646739abcb384badd695fea2b26',
    makeQuestionCard({
      question: '111',
      acRate: '65.32',
      submit: 29837,
      questionName: 'two-sum',
      tags: '数学',
      question_id: 1,
      title: '两数之和',
    }),
    'interactive'
  )

  console.log(`res:`, res)
})()
