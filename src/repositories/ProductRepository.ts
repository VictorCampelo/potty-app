import Http from '@/services/Http'

import getDiscount from '@/utils/getDiscount'

import type { } from '@/@types/requests'
import type { Product } from '@/@types/entities'

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

export default class ProductRepository extends Http {
  async findAllByStoreId(storeId: string) {
    const products = await this.get<Product[]>(
      `/products/store/${storeId}?limit=10&offset=0&loadRelations=true&loadLastSolds=false`
    )

    return products.map(product => {
      if (product.price) { product.priceWithDiscount = getDiscount(product.price, product.discount) }
      return product
    })
  }

  async findById(id: string) {
    const product = await this.get<Product>(`/products/${id}?files=true`)
    if (product.price) { product.priceWithDiscount = getDiscount(product.price, product.discount) }
    return product
  }

  async getRecommendProducts(id: string) {
    const products = await this.get<Product[]>(
      `/products/store/${id}?limit=6&offset=0&loadRelations=true&loadLastSolds=false`
    )

    return products.map(product => {
      if (product.price) { product.priceWithDiscount = getDiscount(product.price, product.discount) }
      return product
    })
  }

  createProduct(data: any) {
    return this.post('/products', data, config)
  }

  deleteProduct(id: string) {
    return this.delete(`/products/${id}`)
  }

  updateProduct(id: string, data: any) {
    return this.patch(`/products/details/${id}`, data, config)
  }
}
