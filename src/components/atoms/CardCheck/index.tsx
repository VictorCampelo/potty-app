import { Container } from './styles'

import { AiFillCheckCircle } from 'react-icons/ai'

interface Props {
  color: string
  title: string
  description: string
}

const CardCheck = ({ color, title, description }: Props) => {
  return (
    <Container>
      <AiFillCheckCircle size={96} color={color} />
      <p>{title}</p>
      <span>{description}</span>
    </Container>
  )
}

export default CardCheck
