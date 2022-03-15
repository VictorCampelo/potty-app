import React from 'react'

import { Container } from './styles'

const Waves = () => {
  return (
    <Container>
      <img className='first' src='/images/wave1.svg' alt='wave 1' />

      <img className='second' src='/images/wave2.svg' alt='wave 2' />

      <img
        className='third'
        src='/images/illustration1.svg'
        alt='illustration 1'
      />

      <img
        className='fourth'
        src='/images/illustration2.svg'
        alt='illustration 2'
      />
    </Container>
  )
}

export default Waves
