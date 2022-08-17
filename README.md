# 飞书SDK

> 可恶，这个SDK居然让你们这些人类发现了，唉，我就勉为其难的重构一下吧...

飞书官方的SDK可以参见：https://github.com/larksuite/node-sdk/blob/main/README.zh.md

建议大家优先选用官方维护的类库，我个人版本实现的比较随意，不太稳定，不建议使用。

## 说明
封装了一些常用的API


## API

### auth
#### getTenantToken
> 获取tenant token

#### setToken
> 配置全局token

### chats
#### putMessageTop
> 消息置顶
#### getChats
> 获取所有群组

### message
#### sendMessage
> 发送消息
#### sendTextMessage
> 发送文本消息（sendMessage语法糖）
#### deleteMessage
> 撤回消息