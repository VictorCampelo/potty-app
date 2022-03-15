import { createContext, useContext, useEffect, useState } from 'react'

import AuthRepository from '@/repositories/AuthRepository'
import UserRepository from '@/repositories/UserRepository'

import { parseCookies } from 'nookies'

import type { ReactNode } from 'react'
import type { User } from '@/@types/entities'

interface AuthContextData {
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
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const { 'ultimo.auth.token': token } = parseCookies()
    if (!user && token) {
      fetchUser()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signOut, isAuthenticated, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}
