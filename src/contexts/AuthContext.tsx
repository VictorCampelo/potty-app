import { createContext, useContext, useEffect, useState, useMemo } from 'react'

import Router from 'next/router'

import AuthRepository from '@/repositories/AuthRepository'
import UserRepository from '@/repositories/UserRepository'
import StoreRepository from '@/repositories/StoreRepository'

import type { ReactNode } from 'react'
import type { Store, User, UserSignUpMeta } from '@/@types/entities'
import type { SignInDTO } from '@/@types/requests'

interface AuthContextData {
  signOut: () => void
  signIn: (
    dto: SignInDTO,
    { remember }: { remember: boolean }
  ) => Promise<User | undefined>
  isAuthenticated: boolean
  user: User | null
  store: Store | null
  fetchUser: () => Promise<void>
  signUpMeta: UserSignUpMeta | null
  setSignUpMeta: (meta: UserSignUpMeta) => void
  clearSignUpMeta: () => void
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const authRepository = new AuthRepository()
const userRepository = new UserRepository()
const storeRepository = new StoreRepository()

export const AuthContext = createContext<AuthContextData>({
  signOut: () => undefined,
  signIn: async () => undefined,
  isAuthenticated: false,
  user: null,
  store: null,
  signUpMeta: null,
  fetchUser: async () => undefined,
  setSignUpMeta: () => undefined,
  clearSignUpMeta: () => undefined,
  isLoading: true
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [store, setStore] = useState<Store | null>(null)
  const [signUpMeta, setSignUpMeta] = useState<UserSignUpMeta | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = useMemo(() => !!user?.email, [user])

  const fetchStore = async (storeId: string) => {
    try {
      setIsLoading(true)
      const store = await storeRepository.findById(storeId)
      setStore(store)
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const user = await userRepository.getMe()
      const storeId = user?.store?.id
      if (storeId) await fetchStore(storeId)
      setUser(user)
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    try {
      setIsLoading(true)

      setUser(null)

      authRepository.singOut()

      Router.push('/')
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (dto: SignInDTO, { remember } = { remember: true }) => {
    try {
      setIsLoading(true)

      const data = await authRepository.singIn(dto)

      if (remember) {
        localStorage.setItem('bdv.auth.token', data.jwtToken)
      } else {
        sessionStorage.setItem('bdv.auth.token', data.jwtToken)
      }

      setUser(data.user)

      return data.user
    } finally {
      setIsLoading(false)
    }
  }

  const clearSignUpMeta = () => {
    sessionStorage.removeItem('bdv.auth.register.meta')
    setSignUpMeta(null)
  }

  useEffect(() => {
    if (signUpMeta) {
      sessionStorage.setItem(
        'bdv.auth.register.meta',
        JSON.stringify(signUpMeta)
      )
    } else {
      sessionStorage.removeItem('bdv.auth.register.meta')
    }
  }, [signUpMeta])

  useEffect(() => {
    const token =
      localStorage.getItem('bdv.auth.token') ||
      sessionStorage.getItem('bdv.auth.token')
    const sessionSingUpMeta = sessionStorage.getItem('bdv.auth.register.meta')

    if (!user && token) {
      fetchUser()
    } else {
      setIsLoading(false)
    }

    if (sessionSingUpMeta) {
      sessionStorage.setItem(
        'bdv.auth.register.meta',
        JSON.stringify(sessionSingUpMeta)
      )
      setSignUpMeta(JSON.parse(sessionSingUpMeta))
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signUpMeta,
        fetchUser,
        setSignUpMeta,
        clearSignUpMeta,
        signOut,
        signIn,
        isAuthenticated,
        user,
        store,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}
