import Http from '@/services/Http'
import type { User } from '@/@types/entities'
import type { GetMeResponse } from '@/@types/requests'

export default class UserRepository extends Http {
  getMe() {
    return this.get<GetMeResponse>('users/me')
  }

  update(dto: Partial<User>) {
    return this.patch('users', dto)
  }
}
