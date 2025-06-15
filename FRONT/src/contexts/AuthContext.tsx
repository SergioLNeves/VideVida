import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, AuthState } from '@/types/auth'

interface AuthContextType extends AuthState {
    login: (user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false
    })

    const login = (user: User) => {
        setAuthState({
            user,
            isAuthenticated: true
        })
    }

    const logout = () => {
        setAuthState({
            user: null,
            isAuthenticated: false
        })
    }

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
