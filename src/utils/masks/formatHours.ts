/*
Examples:
  format('00000123456')
  format('0000000000')
  format('000000000000000')
  format('123456')
  format('000321700')
  format('000846600')
*/

const formatHours = (time: any) => {
  time = time.replace(/[^\d]/g, '')
  time = time.substring(0, 4)
  if (time.length > 2) {
    time = time.replace(/^(\d{2})(\d*)/, '$1:$2')
  }
  return time
}

export default formatHours
