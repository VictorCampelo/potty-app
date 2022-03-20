import { Container, Text, Time } from './styles'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

interface Props {
  name: string
  stars: number
  text: string
  time: string
}

const FeedbackList = ({ name, stars, text, time }: Props) => {
  const starsIcons = []

  if (stars > 5) {
    stars = 5
  }

  for (let i = 0; i < stars; i++) {
    starsIcons.push(<AiFillStar key={i} size={18} color='#ffe249' />)
  }
  for (let i = stars; i < 5; i++) {
    starsIcons.push(<AiOutlineStar key={i + 5} size={18} color='#ffe249' />)
  }

  return (
    <Container>
      <div className='title'>
        <div className='left'>
          <h1>{name}</h1>
          <div className='stars'>{starsIcons}</div>
        </div>
      </div>

      <Text>{text}</Text>

      <Time>{time}</Time>
    </Container>
  )
}

export default FeedbackList
