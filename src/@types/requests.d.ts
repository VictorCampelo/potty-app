import type { User } from '@/@types/entities'

export interface SignInDTO {
  email: string
  password: string
}

export interface SignInResponse {
  jwtToken: string
  user: User
}

export interface SignUpDTO {
  email: string
  password: string
}

export interface SignUpResponse {
  jwtToken: string
  user: User
}

export interface GetMeResponse extends User {}

export interface FindPlanResponse {
  url: string
}
