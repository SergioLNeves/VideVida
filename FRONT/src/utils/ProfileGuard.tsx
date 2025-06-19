import { useUserProfile } from '@/hooks/useUserProfile'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProfileGuardProps {
  children: ReactNode
  redirectTo?: string
}

export function ProfileGuard({ children, redirectTo = '/profile/complete' }: ProfileGuardProps) {
  const navigate = useNavigate()
  const { profile, isProfileComplete, isLoading } = useUserProfile()

  useEffect(() => {
    // Aguardar o carregamento do perfil
    if (isLoading) return

    // Se não há perfil ou não está completo, redirecionar
    if (!profile || !isProfileComplete) {
      navigate(redirectTo)
    }
  }, [profile, isProfileComplete, isLoading, navigate, redirectTo])

  // Mostrar loading enquanto verifica o perfil
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando perfil...</p>
        </div>
      </div>
    )
  }

  // Se perfil não está completo, não renderizar os children
  if (!profile || !isProfileComplete) {
    return null
  }

  return <>{children}</>
}
