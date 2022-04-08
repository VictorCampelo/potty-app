import React from 'react'

import formatToBrl from '@/utils/formatToBrl'
import ellipsis from '@/utils/ellipsis'

import { Container } from './styles'

import type { Product } from '@/@types/entities'

interface Props {
  product: Product
  onClick: () => void
}

const ProductCardHorizon = ({ product, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      <img
        width={156}
        height={156}
        src={product.files[0]?.url}
        alt={product.title}
      />
      <div className='infos'>
        <span className='title'>{ellipsis(product.title, 70)}</span>
        <div className='score'>
          <img
            width={24}
            height={24}
            src='/images/estrela.svg'
            alt='icone de estrela'
          />
          <span>
            {product.avgStars} | {product.sumOrders} Pedidos
          </span>
        </div>
        <div className='price'>
          {product.priceWithDiscount ? (
            <small>{formatToBrl(product.priceWithDiscount)}</small>
          ) : null}

          <span>{formatToBrl(product.price)}</span>
        </div>

        {product.description ? (
          <p className='description'>{ellipsis(product.description, 100)}</p>
        ) : null}
      </div>
    </Container>
  )
}

export default ProductCardHorizon
