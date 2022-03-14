/*
Examples:
  format('00000123456')
  format('0000000000')
  format('000000000000000')
  format('123456')
  format('000321700')
  format('000846600')
*/
const formDouble = (mon: any): string => {
  mon = mon.replace(/[^\d]/g, '')
  if (mon.length > 3) {
    mon = mon.replace(/^(\d*)(\d{2})$/, '$1.$2')
  } else if (mon.length > 0) {
    mon = (mon.length === 1 ? '00' : '0') + mon
    mon = mon.replace(/^(\d*)(\d{2})$/, '$1.$2')
  }
  while (mon[0] === '0' && mon[1] !== '.') {
    mon = mon.substring(1, mon.length)
  }

  mon = mon.replace(/(\d)(?=(\d{3})+,)/g, '$1,')

  if (mon === '' || mon === '0.00' || mon === '') {
    return ''
  }
  return `${mon}`
}

export default formDouble
