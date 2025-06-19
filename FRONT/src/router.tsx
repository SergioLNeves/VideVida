import {
  AdminPage,
  AgendamentoPage,
  AgendamentosListPage,
  HomePage,
  LoginPage,
  MedicoPage,
  NotFoundPage,
  PacientePage,
  ProfileCompletionPage,
  RegisterPage
} from '@/pages'
import type { UserType } from '@/types/auth'
import { ProfileGuard } from '@/utils'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

// ==================== CONFIGURAÇÃO DE ROTAS ====================

// Constantes para os caminhos das rotas
export const ROUTES = {
  // Rotas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Rotas por tipo de usuário
  PACIENTE: '/paciente',
  MEDICO: '/medico',
  ADMIN: '/admin',
  
  // Rotas de perfil
  PROFILE_COMPLETE: '/profile/complete',
  
  // Rotas de agendamento (paciente)
  AGENDAMENTO: '/agendamento',
  AGENDAMENTOS: '/agendamentos',
  
  // Rota 404
  NOT_FOUND: '*'
} as const

// Tipos de usuário que podem acessar rotas compartilhadas
const ALL_USER_TYPES: UserType[] = ['paciente', 'medico', 'admin']
const PACIENTE_ONLY: UserType[] = ['paciente']
const MEDICO_ONLY: UserType[] = ['medico']
const ADMIN_ONLY: UserType[] = ['admin']

// Tipos para as rotas
interface ProtectedRouteConfig {
  path: string
  element: React.ReactNode
  allowedTypes: UserType[]
  requiresProfileComplete?: boolean
}

// Componente auxiliar para rotas protegidas com perfil
function ProtectedProfileRoute({ 
  children, 
  allowedTypes 
}: { 
  children: React.ReactNode
  allowedTypes: UserType[]
}) {
  return (
    <ProtectedRoute allowedTypes={allowedTypes}>
      <ProfileGuard>
        {children}
      </ProfileGuard>
    </ProtectedRoute>
  )
}

// Configuração das rotas protegidas
const protectedRoutes: ProtectedRouteConfig[] = [
  // Rotas específicas por tipo de usuário
  {
    path: ROUTES.PACIENTE,
    element: <PacientePage />,
    allowedTypes: PACIENTE_ONLY
  },
  {
    path: ROUTES.MEDICO,
    element: <MedicoPage />,
    allowedTypes: MEDICO_ONLY
  },
  {
    path: ROUTES.ADMIN,
    element: <AdminPage />,
    allowedTypes: ADMIN_ONLY
  },
  
  // Rotas que requerem apenas autenticação
  {
    path: ROUTES.PROFILE_COMPLETE,
    element: <ProfileCompletionPage />,
    allowedTypes: ALL_USER_TYPES
  },
  
  // Rotas que requerem perfil completo (apenas paciente)
  {
    path: ROUTES.AGENDAMENTO,
    element: <AgendamentoPage />,
    allowedTypes: PACIENTE_ONLY,
    requiresProfileComplete: true
  },
  {
    path: ROUTES.AGENDAMENTOS,
    element: <AgendamentosListPage />,
    allowedTypes: PACIENTE_ONLY,
    requiresProfileComplete: true
  }
]

// Função para criar route objects das rotas protegidas
function createProtectedRoutes(): RouteObject[] {
  return protectedRoutes.map(({ path, element, allowedTypes, requiresProfileComplete }) => ({
    path,
    element: requiresProfileComplete 
      ? <ProtectedProfileRoute allowedTypes={allowedTypes}>{element}</ProtectedProfileRoute>
      : <ProtectedRoute allowedTypes={allowedTypes}>{element}</ProtectedRoute>
  }))
}

// ==================== CONFIGURAÇÃO PRINCIPAL DO ROUTER ====================

export const router = createBrowserRouter([
  // ========== ROTAS PÚBLICAS ==========
  {
    path: ROUTES.HOME,
    element: <HomePage />
  },
  {
    path: '/home', // Alias para compatibilidade
    element: <HomePage />
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />
  },
  
  // ========== ROTAS PROTEGIDAS ==========
  // Geradas dinamicamente a partir da configuração
  ...createProtectedRoutes(),
  
  // ========== ROTA 404 ==========
  // Deve ser sempre a última rota
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />
  }
])
