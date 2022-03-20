import React from 'react'

import formatToBrl from '@/utils/formatToBrl'

import { Container } from './styles'

interface Props {
  image: string
  name: string
  code: string
  quantity: number
  price?: number
}

const ProductList = ({ image, name, code, quantity, price }: Props) => {
  return (
    <Container>
      <div className='left-area'>
        <img src={image} alt={name} />

        <div className='titles'>
          <h2>{name}</h2>
          <h3>Cód.: {code}</h3>
        </div>
      </div>

      <div className='right-area'>
        <p>Qntd.: {quantity}</p>

        {price && <span>Uni.: {formatToBrl(price)}</span>}
      </div>
    </Container>
  )
}

export default ProductList
