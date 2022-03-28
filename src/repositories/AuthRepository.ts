import Http from '@/services/Http'

import { destroyCookie } from 'nookies'

import type {
  SignInDTO,
  SignInResponse,
  SignUpDTO,
  SignUpResponse
} from '@/@types/requests'

export default class AuthRepository extends Http {
  singIn(dto: SignInDTO) {
    return this.post<SignInDTO, SignInResponse>('/auth/signin', dto)
  }

  singUp(dto: SignUpDTO) {
    return this.post<SignUpDTO, SignUpResponse>('/auth/signup', dto)
  }

  singOut() {
    destroyCookie(null, 'bdv.auth.token')
    destroyCookie(null, 'bdv.auth.refreshToken')
  }

  verifyAccount(token: string) {
    return this.patch(`/auth/token?tokenDigits=${token}`, {})
  }
}
