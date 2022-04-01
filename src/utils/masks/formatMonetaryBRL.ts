/*
Examples:
  format('00000123456')
  format('0000000000')
  format('000000000000000')
  format('123456')
  format('000321700')
  format('000846600')
*/
import currency from 'currency.js'

const formatMonetaryBRL = (value: any): string => {
  return currency(value, { symbol: 'R$', precision: 2 }).format()
}

export default formatMonetaryBRL
