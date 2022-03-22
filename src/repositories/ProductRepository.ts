import Http from '@/services/Http'

import type {} from '@/@types/requests'

const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

export default class ProductRepository extends Http {
  getProducts(id: string) {
    return this.get<any>(
      `/products/store/${id}?limit=10&offset=0&loadRelations=true&loadLastSolds=false`
    )
  }

  getProduct(id: string) {
    return this.get(`/products/${id}?files=true`)
  }

  getRecommendProducts(id: string) {
    return this.get(
      `/products/store/${id}?limit=6&offset=0&loadRelations=true&loadLastSolds=false`
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
