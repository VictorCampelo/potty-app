import React from 'react'

import Image from 'next/image'

import { Container } from './styles'

const Waves = () => {
  return (
    <Container>
      <Image
        className='first'
        src='/images/wave1.svg'
        alt='wave 1'
        layout='fill'
      />

      <Image
        className='second'
        src='/images/wave2.svg'
        alt='wave 2'
        layout='fill'
      />

      <Image
        className='third'
        src='/images/illustration1.svg'
        alt='illustration 1'
        layout='fill'
      />

      <Image
        className='fourth'
        src='/images/illustration2.svg'
        alt='illustration 2'
        layout='fill'
      />
    </Container>
  )
}

export default Waves
