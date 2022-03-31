import Http from '@/services/Http'

import type {
  SendOrdersDTO,
  FindOrderDTO,
  UpdateOrderDTO
} from '@/@types/requests'

export default class OrderRepository extends Http {
  send(dto: SendOrdersDTO) {
    return this.post<{ products: SendOrdersDTO }, any>('orders', {
      products: dto
    })
  }

  find({ id, confirmed = false, offset = 0, limit = 8 }: FindOrderDTO) {
    return this.get<any>(
      `orders/store/order?id=${id}&confirmed=${confirmed}&offset=${offset}&limit=${limit}`
    )
  }

  update(dto: UpdateOrderDTO) {
    return this.patch<UpdateOrderDTO, any>('orders/update', dto)
  }
}
