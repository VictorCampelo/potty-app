import { HiOutlineEmojiSad } from 'react-icons/hi'

import { Container, Text } from './styles'

const NoneItems = () => {
  return (
    <Container>
      <HiOutlineEmojiSad size={60} color='#B2B5BA' />

      <Text>Ainda não há informações disponíveis</Text>
    </Container>
  )
}

export default NoneItems
