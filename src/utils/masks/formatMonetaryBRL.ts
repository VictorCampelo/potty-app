/*
Examples:
  format('00000123456')
  format('0000000000')
  format('000000000000000')
  format('123456')
  format('000321700')
  format('000846600')
*/
const formatMonetaryBRL = (value: any): string => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  return formatter.format(Number(value))
}

export default formatMonetaryBRL
