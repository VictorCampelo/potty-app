import React from 'react'

import { Container } from './styles'

import formatToBrl from '@/utils/formatToBrl'
import ellipsis from '@/utils/ellipsis'

import type { Product } from '@/@types/entities'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import IconButton from '@/components/atoms/IconButton'

interface Props {
  product: Product
  onClick: () => void
}

const ProductCard = ({ product, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      <img
        width={156}
        height={156}
        src={product.files[0]?.url}
        alt={product.title}
      />
      <div className='title'>
        <span>{ellipsis(product.title, 30)}</span>
      </div>
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

      {product.parcelAmount > 1 && (
        <p>
          Em até {product.parcelAmount}x sem juros ou{' '}
          <strong>
            {formatToBrl(product.priceWithDiscount || product.price)}
          </strong>{' '}
          à vista
        </p>
      )}
      <IconButton style={{ position: 'absolute', top: '50%', left: 0 }}>
        <BiChevronLeft size={32} color='black' />
      </IconButton>
      <IconButton style={{ position: 'absolute', top: '50%', right: 0 }}>
        <BiChevronRight size={32} color='black' />
      </IconButton>
    </Container>
  )
}

export default ProductCard
