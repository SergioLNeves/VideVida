import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { PacientePage } from '@/pages/PacientePage'
import { MedicoPage } from '@/pages/MedicoPage'
import { AdminPage } from '@/pages/AdminPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/paciente',
    element: (
      <ProtectedRoute allowedTypes={['paciente']}>
        <PacientePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/medico',
    element: (
      <ProtectedRoute allowedTypes={['medico']}>
        <MedicoPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedTypes={['admin']}>
        <AdminPage />
      </ProtectedRoute>
    )
  },
  // Rota antiga para compatibilidade - redireciona baseado no tipo de usuário
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <div>Redirecionando...</div>
      </ProtectedRoute>
    )
  }
])
