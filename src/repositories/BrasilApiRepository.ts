import Http from '@/services/Http'

import type { SearchCepResponse } from '@/@types/requests'

export default class BrasilApiRepository extends Http {
  async searchCep(cep: string) {
    const response = await this.http.get<SearchCepResponse>(
      `https://brasilapi.com.br/api/cep/v2/${cep}`
    )
    return response.data
  }
}
