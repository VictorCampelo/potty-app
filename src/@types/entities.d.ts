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
  alternativeText: any
  caption: any
  hash: any
  ext: any
  mime: any
  provider: any
  url: string
  previewUrl: any
  width: any
  height: any
  createdBy: any
  updatedBy: any
  formats: any
  providerMetadata: any
  tags: any
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Background {
  id: string
  name: string
  filename: string
  alternativeText: any
  caption: any
  hash: any
  ext: any
  mime: any
  provider: any
  url: string
  previewUrl: any
  width: any
  height: any
  createdBy: any
  updatedBy: any
  formats: any
  providerMetadata: any
  tags: any
  createdAt: string
  updatedAt: string
  deletedAt: any
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
  facebookLink: any
  instagramLink: any
  whatsappLink: any
  schedules: Schedules
  createdAt: string
  updatedAt: string
  likes: number
  deliveryFee: number
  dispatch: string
  avatar: Avatar
  background: Background
}
