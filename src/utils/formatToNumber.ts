export default function formatToNumber(value: string): number {
  return Number(value.replace('R$', '').replace(/\./g, '').replace(',', '.'))
}
