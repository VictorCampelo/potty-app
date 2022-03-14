/*
Example:
  format('00000123456')
  format('0000000000')
  format('000000000000000')
  format('123456')
  format('000321700')
  format('000846600')
*/
const formatCard = (time: any) => {
  time = time.replace(/[^\d]/g, '')
  time = time.substring(0, 16)
  if (time.length > 4) {
    time = time.replace(/^(\d{4})(\d*)/, '$1 $2')
  }
  if (time.length > 9) {
    time = time.replace(/^(.{9})(\d*)/, '$1 $2')
  }
  if (time.length > 14) {
    time = time.replace(/^(.{14})(\d*)$/, '$1 $2')
  }

  return time
}

export default formatCard
