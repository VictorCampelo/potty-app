export default function formatToBrl(value: number | string): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  return formatter.format(Number(value))
}
