import type { User, Store, Order } from '@/@types/entities'

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

export interface GetMeResponse extends User {
  store?: Store
}

export interface FindPlanResponse {
  url: string
}

export type StoreResponse = Store

export type SendOrdersDTO = Order[]
export interface FindOrderDTO {
  id?: string
  confirmed?: boolean
  offset?: number
  limit?: number
}

export interface UpdateOrderDTO {
  orderId: string
  situation: 'Recebido' | 'Processando' | 'Concluído' | 'Cancelado'
}
