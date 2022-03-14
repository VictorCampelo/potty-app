import Http from '@/services/Http'
import type { GetMeResponse } from '@/@types/requests'

export default class UserRepository extends Http {
  getMe() {
    return this.get<GetMeResponse>('/users/me')
  }
}
