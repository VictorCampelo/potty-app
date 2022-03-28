import Http from '@/services/Http'
import type { User } from '@/@types/entities'
import type { GetMeResponse } from '@/@types/requests'

const getUserFormattedAddress = (user: User): string => {
  user.street = user.street || ''
  user.addressNumber = user.addressNumber ? `-${user.addressNumber}` : ''
  user.neighborhood = user.neighborhood ? `, ${user.neighborhood}` : ''
  user.city = user.city ? `, ${user.city}` : ''
  user.uf = user.uf ? `, ${user.uf}` : ''
  user.zipcode = user.zipcode ? `, ${user.zipcode}` : ''

  return `${user.street}${user.addressNumber}${user.neighborhood}${user.city} ${user.uf} ${user.zipcode} Brasil`
}

export default class UserRepository extends Http {
  async getMe() {
    const user = await this.get<GetMeResponse>('users/me')
    user.formattedAddress = getUserFormattedAddress(user)
    return user
  }

  update(dto: Partial<User>) {
    return this.patch('users', dto)
  }
}
