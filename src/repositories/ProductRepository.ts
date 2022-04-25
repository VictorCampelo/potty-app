import Http from '@/services/Http'

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
  async findAllByStoreId(storeId: string, filter: GetAllStoreProductsDTO = {}) {
    const pagination = await this.get<GetAllStoreProductsResponse>(
      `/products/store/${storeId}
      ?page=${filter.page || 1}
      &take=${filter.perPage || 10}
      &starsMin=${filter.starsMin || 0}
      ${filter.categoryId ? `&categories=[${filter.categoryId}]` : ''}
      ${filter.productsOrder === 'most_recent' ? 'loadLastCreated=true' : ''}
      ${
        filter.productsOrder === 'highest_price'
          ? 'loadWithHighestPrice=true'
          : ''
      }
      &loadRelations=true&loadLastSolds=false`
    )

    pagination.data = pagination.data
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

  findById(id: string) {
    return this.get<Product>(`/products/${id}?files=true`)
  }

  getRecommendProducts(id: string, filter: { take: number; page: number }) {
    return this.get<GetRecommendedProductsResponse>(
      `/products/store/${id}?take=${filter.take}&page=${filter.page}&loadRelations=true&loadLastSolds=false`
    )
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
