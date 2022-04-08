import { Container } from './styles'

import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = (props: Props) => {
  return <Container {...props} />
}

export default IconButton
