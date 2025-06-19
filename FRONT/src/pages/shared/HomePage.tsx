import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Users, Clock } from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    // Se o usuário já estiver autenticado, redirecionar para sua página específica
    if (isAuthenticated && user) {
      switch (user.type) {
        case 'paciente':
          navigate('/paciente')
          break
        case 'medico':
          navigate('/medico')
          break
        case 'admin':
          navigate('/admin')
          break
        default:
          break
      }
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">VidaVida</h1>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Entrar
              </Button>
              <Button onClick={() => navigate('/register')}>
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cuidado com a sua saúde em primeiro lugar
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Agende consultas médicas de forma rápida e segura. Conectamos você aos melhores 
            profissionais de saúde com apenas alguns cliques.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Já tenho conta
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Segurança e Privacidade</CardTitle>
              <CardDescription>
                Seus dados médicos são protegidos com a mais alta tecnologia de segurança
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Profissionais Qualificados</CardTitle>
              <CardDescription>
                Conectamos você com médicos especialistas verificados e experientes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Agendamento Rápido</CardTitle>
              <CardDescription>
                Marque suas consultas em poucos minutos, 24 horas por dia, 7 dias por semana
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How it works */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Como funciona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Cadastre-se</h4>
              <p className="text-gray-600">
                Crie sua conta e complete seu perfil médico
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Busque Médicos</h4>
              <p className="text-gray-600">
                Encontre especialistas por área ou tratamento
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Agende</h4>
              <p className="text-gray-600">
                Escolha data e horário que melhor se encaixam
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h4 className="font-semibold mb-2">Consulte</h4>
              <p className="text-gray-600">
                Compareça na consulta e cuide da sua saúde
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-xl font-semibold">VidaVida</span>
            </div>
            <p className="text-gray-400 mb-4">
              Cuidando da sua saúde com tecnologia e humanização
            </p>
            <p className="text-sm text-gray-500">
              © 2025 VidaVida. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
