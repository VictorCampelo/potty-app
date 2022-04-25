import Http from '@/services/Http'
import type {
  StoreResponse,
  CategoriesResponse,
  UpdateStoreDTO
} from '@/@types/requests'
import { Store } from '@/@types/entities'

export default class StoreRepository extends Http {
  async findByName(name: string) {
    const store = await this.get<StoreResponse>(`stores/find/${name}`)
    store.formattedAddress = `${store.neighborhood}, ${store.addressNumber}, ${
      store.city
    } - ${store.state} ${store.zipcode ? `- CEP ${store.zipcode}` : ''}`
    return store
  }

  async findById(id: string) {
    const store = await this.get<StoreResponse>(`stores/id/${id}`)
    store.formattedAddress = `${store.neighborhood}, ${store.addressNumber}, ${
      store.city
    } - ${store.state} ${store.zipcode ? `- CEP ${store.zipcode}` : ''}`
    return store
  }

  getCategories(id: string) {
    return this.get<CategoriesResponse>(`categories/products/${id}`)
  }

  createCategory(categoryName: string) {
    return this.post('categories', { name: categoryName, type: 'store' })
  }

  payments() {
    return this.get<any>('/payments/find')
  }

  toggleFavorite(formatedName: string) {
    return this.post(`stores/toggleFavorite/${formatedName}`, {})
  }

  update(dto: UpdateStoreDTO) {
    return this.patch<UpdateStoreDTO, Store>('/stores', dto)
  }

  updateUsingFormData(dto: FormData) {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    return this.patch<FormData, Store>('/stores', dto, config)
  }
}
