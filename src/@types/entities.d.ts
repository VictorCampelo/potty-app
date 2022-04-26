export interface UserSignUpMeta {
  email: string
  password: string
}

export interface Schedules {
  dom: string[]
  qua: string[]
  qui: string[]
  sab: string[]
  seg: string[]
  sex: string[]
  ter: string[]
}

export type ScheduleDays = 'dom' | 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab'

export interface File {
  id: string
  name: string
  filename: string
  alternativeText?: string
  caption?: string
  hash?: string
  ext?: string
  mime?: string
  provider?: string
  url: string
  previewUrl?: string
  width?: string
  height?: string
  createdBy?: string
  updatedBy?: string
  formats?: string
  providerMetadata?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

interface PaymentMethod {
  id: string
  methodName: string
  allowParcels: boolean
}

export interface Category {
  id: string
  name: string
  storeId: string
}

export interface Store {
  id: string
  name: string
  formatedName: string
  formattedAddress: string
  CNPJ: string
  phone: string
  street: string
  zipcode: string
  addressNumber: number
  neighborhood: string
  city: string
  state: string
  description: string
  enabled: boolean
  isFavorite?: boolean
  sumOrders: number
  sumFeedbacks: number
  sumStars: number
  avgStars: number
  facebookLink: string
  instagramLink: string
  whatsappLink: string
  schedules: Schedules
  createdAt: string
  updatedAt: string
  likes: number
  deliveryFee: number
  dispatch: 'all' | 'withdraw' | 'delivery'
  avatar: File
  background: File
  paymentMethods: PaymentMethod[]
  categories: Category[]
}

export interface Product {
  id: string
  title: string
  description?: string
  tags?: string
  price: number
  priceWithDiscount?: number
  discount: number
  sumOrders: number
  sumFeedbacks: number
  sumStars: number
  avgStars: number
  inventory: number
  lastSold?: string
  parcelAmount: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  storeId: string
  files: File[]
  image?: string
  categories: string[]
}

export interface CartProduct extends Product {
  amount: number
  selected?: boolean
}

export interface CartStore {
  id: string
  name: string
  dispatch: 'all' | 'withdraw' | 'delivery'
  products: CartProduct[]
  paymentMethods: PaymentMethod[]
}

export interface OrderProduct {
  productId: string
  amount: number
  paymentMethod: string
  parcels?: number
}

export interface GuestAddress {
  firstName: string
  lastName: string
  uf: string
  city: string
  street: string
  neighborhood: string
  addressNumber: string
  logradouro: string
  zipcode: string
  complement: string
}

export interface Order {
  storeId: string
  orderProducts: OrderProduct[]
  delivery: boolean
}

export interface UserAddress {
  uf: string
  street: string
  city: string
  zipcode: string
  neighborhood: string
  complement: string
  addressNumber: string
  logradouro: string
  formattedAddress: string
}

export interface User extends UserAddress {
  email: string
  firstName?: string
  lastName?: string
  role: 'USER' | 'OWNER'
  store?: Store
}

export type ProductsOrder =
  | 'most_request'
  | 'most_recent'
  | 'lowest_price'
  | 'highest_price'
  | ''
