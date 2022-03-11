import PuffLoader from 'react-spinners/PuffLoader'

import { Container } from './styles'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  skin?: 'primary' | 'secondary'
  isLoading?: boolean
}

const Button = ({
  skin,
  isLoading = false,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Container skin={skin} {...rest}>
      {isLoading ? <PuffLoader size={28} color='#fff' /> : children}
    </Container>
  )
}

export default Button
