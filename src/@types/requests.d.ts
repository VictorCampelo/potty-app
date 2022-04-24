import type {
  User,
  Store,
  Order,
  OrderGuest,
  ProductsOrder,
  GuestAddress,
  Category,
  Product
} from '@/@types/entities'

export interface Pagination<Data> {
  statusCode: 'success' | 'error'
  data: Data[]
  count: number
  currentPage: number
  nextPage: number
  prevPage?: number
  lastPage: number
}

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

export type GetMeResponse = User

export interface FindPlanResponse {
  url: string
}

export type StoreResponse = Store

export interface SendOrdersDTO {
  products: Order[]
  couponCode?: string
}
export interface SendOrdersGuestDTO {
  products: OrderGuest[]
  guestAddress: GuestAddress
  couponCode?: string
}

export interface FindOrderDTO {
  id?: string
  confirmed?: boolean
  page?: number
  limit?: number
}

export interface UpdateOrderDTO {
  orderId: string
  situation: 'Recebido' | 'Processando' | 'Concluído' | 'Cancelado'
}

export interface Coordinates {
  longitude: string
  latitude: string
}

export interface Location {
  type: string
  coordinates: Coordinates
}

export interface SearchCepResponse {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
  location: Location
}

export type CategoriesResponse = Category[]

export interface GetAllStoreProductsDTO {
  page?: number
  perPage?: number
  categoryId?: string
  starsMin?: number
  productsOrder?: ProductsOrder
  search?: string
}

export type UpdateStoreDTO = Partial<Store>

export type GetAllStoreProductsResponse = Pagination<Product>

export type GetRecommendedProductsResponse = Pagination<Product>
