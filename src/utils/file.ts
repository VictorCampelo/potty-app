export function getFileURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(String(reader.result))
  })
}

export function dataURLtoBlob(dataURL: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURLs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURL.split(',')[1])

  // separate out the mime component
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

export function dataURLtoFile(dataURL: string, filename: string) {
  const blob = dataURLtoBlob(dataURL)
  return new File([blob], filename)
}
