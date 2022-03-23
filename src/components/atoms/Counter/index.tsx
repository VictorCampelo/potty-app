import React from 'react'

import { useCart } from '@/contexts/CartContext'

import { Container, Button } from './styles'

interface Props {
  id: string
}

const Counter = ({ id }: Props) => {
  const { products, setProducts } = useCart()

  return (
    <Container>
      <Button
        className={
          products.find((it) => it.id === id)?.amount === 1 ? 'inactive' : ''
        }
        onClick={() => {
          if (products.find((it) => it.id === id)?.amount || 0 > 1) {
            setProducts(
              products.map((it) => {
                if (it.id === id) {
                  return {
                    ...it,
                    amount: it.amount - 1
                  }
                } else return it
              })
            )
          }
        }}
      >
        -
      </Button>
      <p>{products.find((it) => it.id === id)?.amount || 0}</p>
      <Button
        onClick={() => {
          setProducts(
            products.map((it) => {
              if (it.id === id) {
                return {
                  ...it,
                  amount: it.amount + 1
                }
              } else return it
            })
          )
        }}
      >
        +
      </Button>
    </Container>
  )
}

export default Counter
