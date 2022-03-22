export default function randomString() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const passwordLength = 16
  let name = ''

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    name += chars.substring(randomNumber, randomNumber + 1)
  }
  const fileName = name
  return fileName
}
