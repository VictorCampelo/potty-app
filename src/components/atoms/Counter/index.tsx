import React from 'react'

import { useCart } from '@/contexts/CartContext'

import { Container, Button } from './styles'

import type { CartProduct } from '@/@types/entities'

interface Props {
  product: CartProduct
}

const Counter = ({ product }: Props) => {
  const { removeProduct, addProduct } = useCart()

  return (
    <Container>
      <Button
        disabled={product?.amount === 1}
        className={product?.amount === 1 ? 'inactive' : ''}
        onClick={() => {
          removeProduct(product.id, false)
        }}
      >
        -
      </Button>
      <p>{product?.amount || 0}</p>
      <Button
        onClick={() => {
          addProduct(product)
        }}
      >
        +
      </Button>
    </Container>
  )
}

export default Counter
