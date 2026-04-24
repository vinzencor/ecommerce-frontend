/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AuthResponse } from '../api/auth'

interface AuthContextType {
  user: AuthResponse['data']['user'] | null
  token: string | null
  setAuth: (data: AuthResponse['data']) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'))
  const [user, setUser] = useState<AuthContextType['user']>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? (JSON.parse(savedUser) as AuthContextType['user']) : null
  })

  const setAuth = (data: AuthResponse['data']) => {
    setToken(data.accessToken)
    setUser(data.user)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setAuth,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
