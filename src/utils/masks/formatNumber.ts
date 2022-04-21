const formatNumber = (number: any): string => {
  number = String(number || '').replace(/\D/g, '')

  return number
}

export default formatNumber
