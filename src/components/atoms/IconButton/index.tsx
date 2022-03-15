import { Container } from './styles'

import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = ({ ...rest }: Props) => {
  return <Container {...rest} />
}

export default IconButton
