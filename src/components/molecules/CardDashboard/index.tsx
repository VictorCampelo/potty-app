import React from 'react'

import { Wrapper, Container, Title, Subtitle } from './styles'

interface Props {
  title?: string
  subtitle?: React.ReactNode
  children: React.ReactNode
  width?: string
}

const CardDashboard = ({ title, subtitle, children, width }: Props) => {
  return (
    <Wrapper width={width}>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default CardDashboard
