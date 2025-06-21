import {
  AdminPage,
  AgendamentoPage,
  AgendamentosListPage,
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

export const ROUTES = {
  // Rotas por tipo de usuário
  PACIENTE: '/paciente',
  MEDICO: '/medico',
  ADMIN: '/admin',
  
  // Rota de complemento cadastral do paciente
  PROFILE_COMPLETE: '/profile/complete',

  // Rota de agendamento de agendamento
  AGENDAMENTO_PACIENTE: '/agendamento',
  GET_AGENDAMENTOS: '/agendamentos', 
  
  // Rota 404
  NOT_FOUND: '*'
} as const

// Tipos de usuário que podem acessar rotas compartilhadas
const ALL_USER_TYPES: UserType[] = ['paciente', 'medico', 'admin']
const PACIENTE_ONLY: UserType[] = ['paciente']
const MEDICO_ONLY: UserType[] = ['medico']
const ADMIN_ONLY: UserType[] = ['admin']

interface ProtectedRouteConfig {
  path: string
  element: React.ReactNode
  allowedTypes: UserType[]
  requiresProfileComplete?: boolean
}

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

const protectedRoutes: ProtectedRouteConfig[] = [
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
  {
    path: ROUTES.PROFILE_COMPLETE,
    element: <ProfileCompletionPage />,
    allowedTypes: ALL_USER_TYPES
  },
  
  // Rotas que requerem perfil completo (apenas paciente)
  // Perfis como Admin e Médico Já têm o perfil completo por padrão
  // e não precisam dessa verificação, pois são gerenciados pelo Admin
  {
    path: ROUTES.AGENDAMENTO_PACIENTE,
    element: <AgendamentoPage />,
    allowedTypes: ALL_USER_TYPES,
    requiresProfileComplete: true
  },
  {
    path: ROUTES.GET_AGENDAMENTOS,
    element: <AgendamentosListPage />,
    allowedTypes: ALL_USER_TYPES,
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
    path: "/",
    element: <LoginPage />
  },
    {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  
  // ========== ROTAS PROTEGIDAS ==========
  ...createProtectedRoutes(),
  
  // ========== ROTA 404 ==========
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />
  }
])
