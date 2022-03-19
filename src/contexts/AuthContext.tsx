import { createContext, useContext, useEffect, useState } from 'react'

import AuthRepository from '@/repositories/AuthRepository'
import UserRepository from '@/repositories/UserRepository'

import { parseCookies } from 'nookies'

import type { ReactNode } from 'react'
import type { User, UserSignUpMeta } from '@/@types/entities'

interface AuthContextData {
  signOut: () => Promise<void>
  isAuthenticated: boolean
  user: User | null
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

export const AuthContext = createContext<AuthContextData>({
  signOut: async () => {},
  isAuthenticated: false,
  user: null,
  signUpMeta: null,
  setSignUpMeta: () => {},
  clearSignUpMeta: () => {},
  isLoading: false
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [signUpMeta, setSignUpMeta] = useState<UserSignUpMeta | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const isAuthenticated = false

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const user = await userRepository.getMe()
      setUser(user)
    } catch {
      signOut()
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)

      setUser(null)

      await authRepository.singOut()
    } catch (error) {
      setUser(null)
      throw error
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
      parseCookies()['bdv.auth.token'] ||
      sessionStorage.getItem('bdv.auth.token')
    const sessionSingUpMeta = sessionStorage.getItem('bdv.auth.register.meta')

    if (!user && token) {
      fetchUser()
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
        setSignUpMeta,
        clearSignUpMeta,
        signOut,
        isAuthenticated,
        user,
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
