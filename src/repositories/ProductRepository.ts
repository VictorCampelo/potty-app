import Http from '@/services/Http'

import getDiscount from '@/utils/getDiscount'

import type {
  GetAllStoreProductsResponse,
  GetAllStoreProductsDTO,
  GetRecommendedProductsResponse,
  CategoriesResponse
} from '@/@types/requests'
import type { Product } from '@/@types/entities'

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

export default class ProductRepository extends Http {
  // TODO: need send filter to api
  async findAllByStoreId(storeId: string, filter: GetAllStoreProductsDTO = {}) {
    const pagination = await this.get<GetAllStoreProductsResponse>(
      `/products/store/${storeId}?page=${filter.page || 1}&take=${
        filter.perPage || 10
      }&starsMin=${filter.starsMin || 0}${
        filter.categoryId ? `&categories=[${filter.categoryId}]` : ''
      }&loadRelations=true&loadLastSolds=false`
    )

    pagination.data = pagination.data
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
        return name
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

    return pagination
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
    const pagination = await this.get<GetRecommendedProductsResponse>(
      `/products/store/${id}?take=${filter.take}&page=${filter.page}&loadRelations=true&loadLastSolds=false`
    )

    pagination.data = pagination.data.map((product) => {
      if (product.price) {
        product.priceWithDiscount = getDiscount(product.price, product.discount)
      }
      return product
    })

    return pagination
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

  getCategories(storeId: string) {
    return this.get<CategoriesResponse>(`categories/products/${storeId}`)
  }
}
