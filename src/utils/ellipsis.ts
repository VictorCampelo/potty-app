const ellipsis = (text: string, length: number) => {
  const preText = text ? text.slice(0, length) : ''
  const sub = text ? text.slice(length, 9999999) : ''
  const result = sub.replace(sub, '...')

  let textResult

  if (preText && preText.length < length) {
    textResult = `${preText}`
  } else {
    textResult = `${preText + result}`
  }

  return textResult
}

export default ellipsis
