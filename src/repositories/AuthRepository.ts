import Http from '@/services/Http'

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

  singUpStore(dto: any) {
    return this.post('/auth/signup-store', dto, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  singOut() {
    localStorage.removeItem('bdv.auth.token')
    sessionStorage.removeItem('bdv.auth.token')
  }

  verifyAccount(token: string) {
    return this.patch(`/auth/token?tokenDigits=${token}`, {})
  }
}
