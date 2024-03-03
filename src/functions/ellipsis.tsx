export function ellipsis(text: string, length: number) {
  const preText = text ? text.substr(0, length) : ''
  const sub = text ? text.substr(length, 9999999) : ''
  const result = sub.replace(sub, '...')

  let textResult

  if (preText && preText.length < length) {
    textResult = `${preText}`
  } else {
    textResult = `${preText + result}`
  }

  return textResult
}
