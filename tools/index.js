const _translateTextToCard = (text, tag = 'markdown') => {
  if (text === '---') {
    return {
      tag: 'hr',
    }
  } else if (/!\[(.*)\]\((.*)\)/.test(text)) {
    console.log(`text:`, text)
    let [_, content, img_key] = text.match(/!\[(.*)\]\((.*)\)/)

    return {
      tag: 'img',
      img_key,
      alt: {
        tag: 'plain_text',
        content,
      },
    }
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
  } else {
    return {
      tag,
      content: text,
    }
  }
}
const makeElements = (elements) => {
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
                  content: element[0],
                },
              },
              {
                is_short: true,
                text: {
                  tag: 'lark_md',
                  content: element[1],
                },
              },
            ],
          }
        case 'note':
          return {
            tag: 'note',
            elements: element.map((item) => _translateTextToCard(item, 'plain_text')),
          }
        case 'button':
          return {
            tag: 'action',
            actions: element.map((item) => _translateTextToCard(item)),
          }
        case 'text-image':
          return {
            tag: 'div',
            text: {
              tag: 'lark_md',
              content: element[0],
            },
            extra: _translateTextToCard(element[1]),
          }
        default:
          break
      }
    } else {
      return _translateTextToCard(element)
    }
  })
}

module.exports = {
  makeElements,
}
