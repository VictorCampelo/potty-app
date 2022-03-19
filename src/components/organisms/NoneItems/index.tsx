import { HiOutlineEmojiSad } from 'react-icons/hi'

import { Container } from './styles'

const NoneItems = () => {
  return (
    <Container>
      <HiOutlineEmojiSad size={60} color='#B2B5BA' />

      <span>Ainda não há informações disponíveis</span>
    </Container>
  )
}

export default NoneItems
