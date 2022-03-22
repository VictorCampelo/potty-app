import Http from '@/services/Http'

import type {} from '@/@types/requests'

export default class CouponRepository extends Http {
  createCoupon(data: any) {
    return this.post('/coupons/', data)
  }

  getCoupon() {
    return this.get<any>('/coupons/')
  }

  editCoupon(data: string) {
    return this.patch(`/coupons/${data}`, {})
  }

  deleteCoupon(data: string) {
    return this.delete(`/coupons/${data}`)
  }
}
