import Http from '@/services/Http'
import Router from 'next/router'

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

  async singOut() {
    sessionStorage.removeItem('bdv.auth.token')
    destroyCookie(null, 'bdv.auth.token')
    destroyCookie(null, 'bdv.auth.refreshToken')

    await Router.push('/')
  }

  verifyAccount(token: string) {
    return this.patch(`/auth/token?tokenDigits=${token}`, {})
  }
}
