import ProductRepository from '@/repositories/ProductRepository'

import type { NextPageContext } from 'next'

const productRepository = new ProductRepository()

const getProductFromInitialProps = async (ctx: NextPageContext) => {
  try {
    console.log(ctx.req)
    const productId = ctx.req?.headers.host?.split('.')[0]

    const product = productId ? await productRepository.getProduct(productId) : null

    return product
  } catch {
    return null
  }
}

export default getProductFromInitialProps
