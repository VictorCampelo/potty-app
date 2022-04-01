export default function formatToBrl(value = 0): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  const number = Number(String(value).replace(/[^0-9]/g, ''))

  return formatter.format(number)
}
