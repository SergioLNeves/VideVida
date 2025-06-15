import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import './index.css'
import { router } from './router'

// Configuração do cliente React Query/TanStack Query
// Este cliente é necessário para o funcionamento dos hooks useQuery, useMutation, etc.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos - dados permanecem "frescos" por 5 min
      retry: 1 // Tenta novamente apenas 1 vez em caso de falha
    },
    mutations: {
      retry: 1 // Tenta novamente apenas 1 vez para operações de escrita
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* QueryClientProvider fornece o contexto do React Query para toda a aplicação */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
