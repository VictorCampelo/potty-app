import Http from '@/services/Http'
import Router from 'next/router'

import { setCookie, destroyCookie } from 'nookies'

import type { SignInDTO, SingInResponse } from '@/@types/requests'

export default class AuthRepository extends Http {
  async singIn(dto: SignInDTO) {
    const data = await this.post<SignInDTO, SingInResponse>('/auth/signin', dto)

    console.log('sing in response data', data)

    setCookie(null, 'ultimo.auth.token', data.jwtToken, {
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: '/'
    })

    return data
  }

  async singOut() {
    destroyCookie(null, 'ultimo.auth.token')
    destroyCookie(null, 'ultimo.auth.refreshToken')

    await Router.push('/')
  }
}
