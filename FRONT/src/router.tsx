import { AdminPage } from '@/pages/AdminPage'
import { LoginPage } from '@/pages/LoginPage'
import { MedicoPage } from '@/pages/MedicoPage'
import { PacientePage } from '@/pages/PacientePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import { createBrowserRouter } from 'react-router-dom'

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
])
