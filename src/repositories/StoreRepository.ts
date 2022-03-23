import Http from '@/services/Http'
import type { Store } from '@/@types/entities'
import type { StoreResponse } from '@/@types/requests'

export default class StoreRepository extends Http {
  findByName(name: string) {
    return this.get<StoreResponse>(`/stores/find/${name}`)
  }

  findById(id: string) {
    return this.get<Store>(`/stores/id/${id}`)
  }
}
