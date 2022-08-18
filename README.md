# 飞书SDK

> 可恶，这个SDK居然让你们这些人类发现了，唉，我就勉为其难的重构一下吧...

飞书官方的SDK可以参见：https://github.com/larksuite/node-sdk/blob/main/README.zh.md

建议大家优先选用官方维护的类库，我个人版本实现的比较随意，不太稳定，不建议使用。

---
## 关于feishu-sdk
纯个人使用，只封装了一些个人日常使用的接口，
接口封装到FAPI.module.function
## 一些糖

### message
`FAPI.message.sendText` 发送文字
`FAPI.message.sendCard` 发送消息卡片

### tools
`FAPI.tools.makeElements` 快速生成卡片内容

例子：
```
  const elements = FAPI.tools.makeElements([
    '![图片](img_v2_b60e8bed-fb1f-4385-xxxx-e4840f1c59fg)',
    '@e6288gb4 向群友发起挑战\n挑战难度为 【easy】',
    '---',
    '报名人数 *7/8*',
    ['text', '报名人数', '*7/8*'],
    ['note', '![图片](img_v2_b60e8bed-fb1f-4385-xxxx-e4840f1c59fg)', '备注消息'],
    [
      'text-image',
      '深度整合使用率极高的办公工具，企业成员在一处即可实现高效沟通与协作。',
      '!b:p[title](http://baidu.com)',
    ],
    ['button', '!b:p[title](http://baidu.com)', '!b:d[title]({ "name": "nemo" })'],
  ])
```


