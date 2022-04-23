import Http from '@/services/Http'

import getDiscount from '@/utils/getDiscount'

import type { GetAllStoreProductsDTO } from '@/@types/requests'
import type { Product } from '@/@types/entities'

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

export default class ProductRepository extends Http {
  async findAllByStoreId(storeId: string, filter: GetAllStoreProductsDTO = {}) {
    const products = await this.get<Product[]>(
      `/products/store/${storeId}?page=${filter.page || 1}&take=${
        filter.perPage || 10
      }&loadRelations=true&loadLastSolds=false`
    )

    return products
      .map((product) => {
        if (product.price) {
          product.priceWithDiscount = getDiscount(
            product.price,
            product.discount
          )
        }
        return product
      })
      .filter((product) => {
        const name = filter.search
          ? product.title.toLowerCase().includes(filter.search.toLowerCase())
          : true
        const category =
          filter.categoryId && product.categories
            ? product.categories.findIndex(({ id }) => id === filter.categoryId)
            : true
        const starFilter = filter.starFilter
          ? product.avgStars >= filter.starFilter
          : true
        return name && category && starFilter
      })
      .sort((a, b) => {
        switch (true) {
          case filter.productsOrder === 'most_recent':
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )

          case filter.productsOrder === 'most_request':
            return (
              (a.priceWithDiscount || a.price) -
              (b.priceWithDiscount || b.price)
            )

          case filter.productsOrder === 'highest_price':
            return (
              (b.priceWithDiscount || b.price) -
              (a.priceWithDiscount || a.price)
            )

          default:
            return 1
        }
      })
  }

  async findById(id: string) {
    const product = await this.get<Product>(`/products/${id}?files=true`)
    if (product.price) {
      product.priceWithDiscount = getDiscount(product.price, product.discount)
    }
    return product
  }

  async getRecommendProducts(
    id: string,
    filter: { take: number; page: number }
  ) {
    const products = await this.get<Product[]>(
      `/products/store/${id}?take=${filter.take}&page=${filter.page}&loadRelations=true&loadLastSolds=false`
    )

    return products.map((product) => {
      if (product.price) {
        product.priceWithDiscount = getDiscount(product.price, product.discount)
      }
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
