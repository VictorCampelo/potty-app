import type { User } from '@/@types/entities'

export interface SignInDTO {
  email: string
  password: string
}

export interface SingInResponse {
  jwtToken: string
}

export interface GetMeResponse extends User {}

export interface FindPlanResponse {
  url: string
}
