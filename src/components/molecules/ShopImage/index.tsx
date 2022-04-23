import React from 'react'

import { Container } from './styles'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  btnIcon: React.ReactElement
  btn: React.ReactElement
}

const ShopImage = ({ imageSrc, btnIcon, btn, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <div className='imageContainer'>
        <img
          className='image'
          src={imageSrc || '/images/icon.png'}
          width='512'
          height='512'
          alt='Foto da loja'
        />
      </div>
      <button type='button' className='imageBtn'>
        <label htmlFor='icon[]'>{btnIcon}</label>
      </button>
      {btn}
    </Container>
  )
}

export default ShopImage
