export type UserType = 'paciente' | 'medico' | 'admin'

export interface User {
    id: string
    email: string
    password: string
    name: string
    type: UserType
}

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
}

export interface LoginCredentials {
    email: string
    password?: string
}

export interface RegisterData {
    email: string
    password: string
    name: string
    type: UserType
}
