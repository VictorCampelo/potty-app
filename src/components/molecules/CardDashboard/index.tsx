import React from 'react'

import { Container, Title, Subtitle } from './styles'

interface Props {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
}

const CardDashboard = ({ title, subtitle, children }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <div>{children}</div>
    </Container>
  )
}

export default CardDashboard
