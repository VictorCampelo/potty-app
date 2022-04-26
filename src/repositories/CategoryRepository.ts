import Http from '@/services/Http'

import type { CategoriesResponse } from '@/@types/requests'
import type { Category } from '@/@types/entities'

export default class CategoryRepository extends Http {
  getProductCategories(storeId: string) {
    return this.get<CategoriesResponse>(`/categories/products/${storeId}`)
  }

  getStoreCategories() {
    return this.get<CategoriesResponse>('/categories')
  }

  createProductCategory(name: string, storeId: string) {
    return this.post('/categories/product', {
      name,
      storeId
    })
  }

  createStoreCategory(categoryName: string) {
    return this.post('categories', { name: categoryName, type: 'store' })
  }

  deleteProductCategory(categoryId: string, storeId: string) {
    return this.delete(`categories/products/${storeId}/category/${categoryId}`)
  }

  updateProductCategory(
    categoryId: string,
    storeId: string,
    data: Partial<Category>
  ) {
    return this.patch(
      `categories/products/${storeId}/category/${categoryId}`,
      data
    )
  }
}
