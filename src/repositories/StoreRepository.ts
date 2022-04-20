import Http from '@/services/Http'
import type { StoreResponse, CategoriesResponse } from '@/@types/requests'

export default class StoreRepository extends Http {
  async findByName(name: string) {
    const store = await this.get<StoreResponse>(`stores/find/${name}`)
    store.formattedAddress = `${store.neighborhood}, ${store.addressNumber}, ${store.city} - ${store.state} - CEP ${store.zipcode}`
    return store
  }

  async findById(id: string) {
    const store = await this.get<StoreResponse>(`stores/id/${id}`)
    store.formattedAddress = `${store.neighborhood}, ${store.addressNumber}, ${store.city} - ${store.state} - CEP ${store.zipcode}`
    return store
  }

  categories(id: string) {
    return this.get<CategoriesResponse>(`categories/products/${id}`)
  }

  toggleFavorite(formatedName: string) {
    return this.post(`stores/toggleFavorite/${formatedName}`, {})
  }
}
