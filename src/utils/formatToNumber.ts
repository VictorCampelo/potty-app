import currency from 'currency.js'

export default function formatToNumber(value: string): number {
  return currency(value, { symbol: 'R$' }).value
}
