import React from 'react'

import { Wrapper, Container, Title, Subtitle } from './styles'

interface Props {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
}

const CardDashboard = ({ title, subtitle, children }: Props) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default CardDashboard
