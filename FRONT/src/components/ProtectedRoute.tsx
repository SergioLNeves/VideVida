import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import type { UserType } from '@/types/auth'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
    children: ReactNode
    allowedTypes?: UserType[]
}

export const ProtectedRoute = ({ children, allowedTypes }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth()

    // Se não estiver autenticado, redireciona para login
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    // Se há tipos permitidos específicos, verifica se o usuário tem permissão
    if (allowedTypes && !allowedTypes.includes(user.type)) {
        // Redireciona para a página apropriada do usuário
        const redirectPath = user.type === 'admin' ? '/admin' :
            user.type === 'medico' ? '/medico' : '/paciente'
        return <Navigate to={redirectPath} replace />
    }

    return <>{children}</>
}
