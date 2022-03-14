const formNumber = (number: any): string => {
  number = number.replace(/\D/g, '')

  return number
}

export default formNumber
