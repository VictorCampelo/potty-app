import React, { useState } from 'react'

import formatToBrl from '@/utils/formatToBrl'
import ellipsis from '@/utils/ellipsis'

import { Container } from './styles'

import type { Product } from '@/@types/entities'
import IconButton from '@/components/atoms/IconButton'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface Props {
  product: Product
  onClick: () => void
}

const ProductCardHorizon = ({ product, onClick }: Props) => {
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
        if (!['path', 'img', 'svg'].includes(elementType)) {
          onClick()
        }
      }}
    >
      <img
        width={156}
        height={156}
        src={product.files[fileIndex]?.url}
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
      <IconButton
        style={{ position: 'absolute', top: '45%', left: 0, zIndex: '999' }}
        onClick={() => updateImage('left')}
      >
        <BiChevronLeft size={32} color='black' />
      </IconButton>
      <IconButton
        style={{
          position: 'absolute',
          top: '45%',
          left: '215px',
          zIndex: '999'
        }}
        onClick={() => updateImage('right')}
      >
        <BiChevronRight size={32} color='black' />
      </IconButton>
    </Container>
  )
}

export default ProductCardHorizon
