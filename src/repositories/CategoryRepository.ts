import Http from '@/services/Http'

import type { CategoriesResponse } from '@/@types/requests'
import type { Category } from '@/@types/entities'

export default class CategoryRepository extends Http {
  getCategories(id: string) {
    return this.get<CategoriesResponse>(`/categories/products/${id}`)
  }

  getStoreCategories() {
    return this.get('/categories')
  }

  createCategory(name: string, storeId: string) {
    return this.post('/categories/product', {
      name,
      storeId
    })
  }

  deleteCategory(id: string, storeId: string) {
    return this.delete(`categories/products/${storeId}/category/${id}`)
  }

  updateCategory(id: string, storeId: string, data: Partial<Category>) {
    return this.patch(`categories/products/${storeId}/category/${id}`, data)
  }
}
