import type { AuthState, User } from '@/types/auth'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'


const AUTH_SESSION_KEY = 'videvida_auth_state'

interface AuthContextType extends AuthState {
    login: (user: User) => void
    logout: () => void
    refreshUserData: () => void
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


// Função para salvar estado de auth no sessionStorage
const saveAuthState = (state: AuthState): void => {
    try {
        sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(state))
    } catch (error) {
        console.error('Erro ao salvar estado de autenticação:', error)
    }
}

// Função para recuperar estado de auth do sessionStorage
const loadAuthState = (): AuthState => {
    try {
        const stored = sessionStorage.getItem(AUTH_SESSION_KEY)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch (error) {
        console.error('Erro ao carregar estado de autenticação:', error)
    }

    return {
        user: null,
        isAuthenticated: false
    }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>(() => loadAuthState())

    // Salva o estado sempre que ele mudar
    useEffect(() => {
        saveAuthState(authState)
    }, [authState])

    const login = (user: User) => {
        const newState = {
            user,
            isAuthenticated: true
        }
        setAuthState(newState)
    }

    const logout = () => {
        const newState = {
            user: null,
            isAuthenticated: false
        }
        setAuthState(newState)

        // Remove o estado de auth da sessão
        try {
            sessionStorage.removeItem(AUTH_SESSION_KEY)
        } catch (error) {
            console.error('Erro ao remover estado de autenticação:', error)
        }
    }

    const refreshUserData = () => {
        // Força um refresh dos dados do usuário se necessário
        if (authState.isAuthenticated && authState.user) {
            setAuthState(prevState => ({ ...prevState }))
        }
    }

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout,
                refreshUserData
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
