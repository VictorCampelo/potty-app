/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default (cep: any) => {
  cep = cep.replace(/[^\d]/g, '')
  cep = cep.substring(0, 8)
  if (cep.length > 5) {
    cep = cep.replace(/^(\d{5})(\d*)/, '$1-$2')
  }
  return cep
}

// format('00000123456')
// format('0000000000')
// format('000000000000000')
// format('123456')
// format('000321700')
// format('000846600')
