import PuffLoader from 'react-spinners/PuffLoader'

import { Container } from './styles'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  skin?: 'primary' | 'secondary'
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = ({
  skin,
  isLoading = false,
  fullWidth,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Container skin={skin} fullWidth={fullWidth} {...rest}>
      {isLoading ? <PuffLoader size={28} color='#fff' /> : children}
    </Container>
  )
}

export default Button
