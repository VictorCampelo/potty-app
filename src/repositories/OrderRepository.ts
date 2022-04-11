import Http from '@/services/Http'

import type {
  SendOrdersDTO,
  SendOrdersGuestDTO,
  FindOrderDTO,
  UpdateOrderDTO
} from '@/@types/requests'

export default class OrderRepository extends Http {
  send(dto: SendOrdersDTO) {
    return this.post<SendOrdersDTO, any>('orders', dto)
  }

  sendAsGuest(dto: SendOrdersGuestDTO) {
    return this.post<SendOrdersGuestDTO, any>('orders/guest', dto)
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
