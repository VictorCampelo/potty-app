const formatTextEachPosition = (text: string, format: string, position = 3) => {
  const len = text.length

  let jump = position
  let newText = ''
  for (let x = 0; x < len; x++) {
    if (x === jump) {
      newText += format
      jump += jump
    }

    newText += text[x]
  }

  return newText
}

export default formatTextEachPosition
