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
