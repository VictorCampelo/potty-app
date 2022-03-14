import { Container } from './styles'

import { AiFillCheckCircle } from 'react-icons/ai'

interface Props {
  iconColor: string
  title: string
  description: string
}

const CardCheck = ({ iconColor, title, description }: Props) => {
  return (
    <Container>
      <AiFillCheckCircle size={96} color={iconColor} />
      <p>{title}</p>
      <span>{description}</span>
    </Container>
  )
}

export default CardCheck
