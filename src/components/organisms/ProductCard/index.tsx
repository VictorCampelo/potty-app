import React, { useState } from 'react'

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
  const [fileIndex, setFileIndex] = useState(0)

  const updateImage = (side: 'right' | 'left') => {
    if (side === 'right') {
      if (fileIndex === product.files.length - 1) setFileIndex(0)
      else setFileIndex(fileIndex + 1)
    }

    if (side === 'left') {
      if (fileIndex === 0) setFileIndex(product.files.length - 1)
      else setFileIndex(fileIndex - 1)
    }
  }

  return (
    <Container
      onClick={(e) => {
        const { elementType } = Object.values(e.target)[0]
        if (!['path', 'svg'].includes(elementType)) {
          onClick()
        }
      }}
    >
      <img
        width={150}
        height={150}
        src={product.files[fileIndex]?.url}
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
        {product.discount ? <small>{formatToBrl(product.price)}</small> : null}

        <span>{formatToBrl(product.priceWithDiscount || product.price)}</span>
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
      <IconButton
        style={{
          position: 'absolute',
          top: '32%',
          left: '-5px',
          zIndex: '999'
        }}
        onClick={() => updateImage('left')}
      >
        <BiChevronLeft size={32} color='black' />
      </IconButton>
      <IconButton
        style={{
          position: 'absolute',
          top: '32%',
          right: '-5px',
          zIndex: '999'
        }}
        onClick={() => updateImage('right')}
      >
        <BiChevronRight size={32} color='black' />
      </IconButton>
    </Container>
  )
}

export default ProductCard
