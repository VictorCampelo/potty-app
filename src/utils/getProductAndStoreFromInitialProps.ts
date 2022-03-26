import ProductRepository from '@/repositories/ProductRepository'
import StoreRepository from '@/repositories/StoreRepository'

import type { NextPageContext } from 'next'

const productRepository = new ProductRepository()
const storeRepository = new StoreRepository()

const getProductAndStoreFromInitialProps = async (ctx: NextPageContext) => {
  const productId = ctx.req?.url?.split('/').pop()

  const product = productId
    ? await productRepository.getProduct(productId)
    : null

  const store = product?.storeId
    ? await storeRepository.findById(product.storeId)
    : null

  return { store, product }
}

export default getProductAndStoreFromInitialProps
