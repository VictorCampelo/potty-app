import React from 'react'

import Router from 'next/router'

import PuffLoader from 'react-spinners/PuffLoader'

import { useCart } from '@/contexts/CartContext'
import formatToBrl from '@/utils/formatToBrl'

import { Wrapper, Container, Quantity, Price } from './styles'

const CartButton = () => {
  const { loading, totalItems, totalPrice } = useCart()

  return (
    <Wrapper onClick={() => Router.push('/carrinho')}>
      {loading ? (
        <PuffLoader size={20} color='#fff' />
      ) : (
        <>
          <Container>
            <img
              src='/images/cartIcon.png'
              alt='Ícone de carrinho'
              width='28'
              height='28'
            />
            <Quantity>{totalItems}</Quantity>
          </Container>

          {totalPrice ? <Price>| {formatToBrl(totalPrice)}</Price> : null}
        </>
      )}
    </Wrapper>
  )
}

export default CartButton
