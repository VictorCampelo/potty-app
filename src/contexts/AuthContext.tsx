import { createContext, useContext, useEffect, useState } from 'react'

import AuthRepository from '@/repositories/AuthRepository'
import UserRepository from '@/repositories/UserRepository'

import type { ReactNode } from 'react'
import type { SignInDTO } from '@/@types/requests'
import type { User } from '@/@types/entities'

interface AuthContextData {
  signIn: (dto: SignInDTO) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const authRepository = new AuthRepository()
const userRepository = new UserRepository()

export const AuthContext = createContext<AuthContextData>({
  signIn: async () => {},
  signOut: async () => {},
  isAuthenticated: false,
  user: null,
  isLoading: false
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
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
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (dto: SignInDTO) => {
    try {
      setIsLoading(true)

      await authRepository.singIn(dto)

      await fetchUser()
    } catch {
      signOut()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}
