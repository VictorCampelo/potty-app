import type { User, Store } from '@/@types/entities'

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
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
  city: string
  uf: string
  street: string
  adressNumber: number
  neighborhood: string
  zipcode: string
  complement: string
}

export interface SignUpResponse {
  jwtToken: string
  user: User
}

export interface GetMeResponse extends User {}

export interface FindPlanResponse {
  url: string
}

export interface StoreResponse extends Store {}
