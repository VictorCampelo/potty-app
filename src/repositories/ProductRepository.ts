import Http from '@/services/Http'

import type {
  GetAllStoreProductsResponse,
  GetAllStoreProductsDTO,
  GetRecommendedProductsResponse
} from '@/@types/requests'
import type { Product } from '@/@types/entities'

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

export default class ProductRepository extends Http {
  async findAllByStoreId(storeId: string, filter: GetAllStoreProductsDTO = {}) {
    const params = new URLSearchParams({
      page: String(filter.page || 1),
      take: String(filter.perPage || 10),
      starsMin: String(filter.starsMin || 0),
      categories: filter.categoryId ? `['${filter.categoryId}']` : '',
      loadLastCreated: String(filter.productsOrder === 'most_recent'),
      loadWithHighestPrice: String(filter.productsOrder === 'highest_price')
    }).toString()

    const pagination = await this.get<GetAllStoreProductsResponse>(
      `/products/store/${storeId}?${params}&loadRelations=true&loadLastSolds=false`
    )

    pagination.data = pagination.data.filter((product) => {
      const name = filter.search
        ? product.title.toLowerCase().includes(filter.search.toLowerCase())
        : true
      return name
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
}
