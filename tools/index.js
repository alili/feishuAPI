const _translateAtUser = (text) => {
  return text.replace(/@(\w+)/g, (match, $1) => {
    return `<at id="${$1}"></at>`
  })
}

const _translateTextToCard = (content, tag = 'markdown', config = {}) => {
  let [text, meta = ''] = content.split('|')

  if (!config.withoutAt) {
    text = _translateAtUser(text)
  }
  // 分割线
  if (text === '---') {
    return {
      tag: 'hr',
    }
    // 图片
  } else if (/!\[(.*)\]\((.*)\)/.test(text)) {
    let [_, content, img_key] = text.match(/!\[(.*)\]\((.*)\)/)

    return {
      tag: 'img',
      img_key,
      alt: {
        tag: 'plain_text',
        content,
      },
    }
    // 按钮
  } else if (/^!b(:\w)?\[/.test(text)) {
    // !b|!b:d = default !b:p = primary !b:d = danger
    let [_, type, content, action] = text.match(/^!b:?(\w)?\[(.*)\]\((.*)\)/)

    type = type === 'p' ? 'primary' : type === 'd' ? 'danger' : 'default'

    let config = {
      tag: 'button',
      type,
      text: {
        tag: 'plain_text',
        content,
      },
    }

    if (/^[http|lark|feishu]/.test(action)) {
      config.url = action
    } else {
      config.value = JSON.parse(action)
    }
    return config
  } else if (tag === 'plain_text') {
    return {
      tag,
      content: text,
    }
    // 普通文字
  } else {
    return {
      tag,
      content: text,
      text_align: meta.match(/left|right|center/g)?.[0] || 'left',
    }
  }
}
const makeElements = (elements, config = {}) => {
  return elements.map((element) => {
    if (Array.isArray(element)) {
      let type = element.shift()
      switch (type) {
        case 'text':
          return {
            tag: 'div',
            fields: [
              {
                is_short: true,
                text: {
                  tag: 'lark_md',
                  content: _translateAtUser(element[0]),
                },
              },
              {
                is_short: true,
                text: {
                  tag: 'lark_md',
                  content: _translateAtUser(element[1]),
                },
              },
            ],
          }
        case 'note':
          return {
            tag: 'note',
            elements: element.map((item) => _translateTextToCard(item, 'lark_md')),
          }
        case 'button':
          return {
            tag: 'action',
            actions: element.map((item) => _translateTextToCard(item)),
          }
        case 'list':
          return {
            tag: 'div',
            text: {
              tag: 'lark_md',
              content: _translateAtUser(element[0]),
            },
            extra: _translateTextToCard(element[1]),
          }
        case 'column_set':
          return {
            tag: 'column_set',
            flex_mode: 'flow',
            background_style: 'default',
            columns: element.map(([content, weight = 1, vertical_align = 'center']) => ({
              tag: 'column',
              width: 'weighted',
              weight,
              vertical_align,
              elements: [_translateTextToCard(content)],
            })),
          }
        default:
          break
      }
    } else {
      return _translateTextToCard(element, 'markdown', config)
    }
  })
}
const makeHeader = (template, content) => ({
  template,
  title: {
    content,
    tag: 'plain_text',
  },
})

module.exports = {
  makeElements,
  makeHeader,
}
