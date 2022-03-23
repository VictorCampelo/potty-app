export interface User {
  email: string
  firstName?: string
  lastName?: string
  role: 'USER' | 'OWNER'
}

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

export interface Avatar {
  id: string
  name: string
  filename: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  provider: string
  url: string
  previewUrl: string
  width: string
  height: string
  createdBy: string
  updatedBy: string
  formats: string
  providerMetadata: string
  tags: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Background {
  id: string
  name: string
  filename: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  provider: string
  url: string
  previewUrl: string
  width: string
  height: string
  createdBy: string
  updatedBy: string
  formats: string
  providerMetadata: string
  tags: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

interface PaymentMethod {
  id: string
  methodName: string
  allowParcels: boolean
}

export interface Store {
  id: string
  name: string
  formatedName: string
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
  dispatch: string
  avatar: Avatar
  background: Background
  paymentMethods: PaymentMethod[]
}

export interface Category {
  name: string
  storeId: string
}

export interface Product {
  storeId: string
  id: string
  amount: number
  title: string
  price: number
  enabled?: boolean
  image?: string
  discount?: number
}
