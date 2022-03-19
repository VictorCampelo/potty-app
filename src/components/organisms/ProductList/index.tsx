import React from 'react'

import formatToBrl from '@/utils/formatToBrl'

import { Wrapper, Container } from './styles'

type Products = {
  image: string
  name: string
  code: string
  quantity: number
  price?: number
}[]

interface Props {
  products: Products
}

const ProductList = ({ products }: Props) => {
  return (
    <Wrapper>
      {products.map((product, i) => {
        return (
          <Container key={i}>
            <div className='left-area'>
              <img src={product.image} alt={product.name} />

              <div className='titles'>
                <h2>{product.name}</h2>
                <h3>Cód.: {product.code}</h3>
              </div>
            </div>

            <div className='right-area'>
              <p>Qntd.: {product.quantity}</p>

              {product.price && <span>Uni.: {formatToBrl(product.price)}</span>}
            </div>
          </Container>
        )
      })}
    </Wrapper>
  )
}

export default ProductList
