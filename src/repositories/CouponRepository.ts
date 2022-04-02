import Http from '@/services/Http'

import type {} from '@/@types/requests'

export default class CouponRepository extends Http {
  createCoupon(data: any) {
    return this.post('/coupons/', data)
  }

  getCoupon() {
    return this.get<any>('/coupons/')
  }

  editCoupon(dto: any) {
    return this.patch(`/coupons/${dto.code}`, dto)
  }

  deleteCoupon(data: string) {
    return this.delete(`/coupons/${data}`)
  }
}
