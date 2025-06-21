import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useAgendamento } from '@/hooks/useAgendamento'
import { Calendar, FileText, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface FunctionalityCardsProps {
  isProfileComplete: boolean
}

export function FunctionalityCards({ isProfileComplete }: FunctionalityCardsProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { agendamentos } = useAgendamento()

  // Filtrar consultas do paciente atual
  const userConsultas = agendamentos.filter(agendamento => 
    agendamento.pacienteId === user?.email || agendamento.pacienteId === 'current_user'
  ).slice(0, 3) // Mostrar apenas as 3 próximas

  const handleAgendarConsulta = () => {
    if (isProfileComplete) {
      navigate('/agendamento')
    } else {
      navigate('/profile/complete?from=agendamento')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card de Consultas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Minhas Consultas
            {!isProfileComplete && (
              <Badge variant="secondary" className="ml-2">
                Requer perfil completo
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {isProfileComplete && userConsultas.length > 0 
              ? `Você tem ${userConsultas.length} consulta(s)` 
              : 'Agende e gerencie suas consultas'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {isProfileComplete && userConsultas.length > 0 && (
            <div className="mb-3 space-y-1">
              {userConsultas.map((consulta) => (
                <div key={consulta.id} className="text-sm flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{new Date(consulta.data).toLocaleDateString('pt-BR')}</span>
                  <Badge variant={consulta.status === 'agendado' ? 'default' : 'secondary'}>
                    {consulta.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
          <Button 
            className="w-full" 
            onClick={handleAgendarConsulta}
          >
            {isProfileComplete ? 'Agendar Consulta' : 'Completar Perfil'}
          </Button>
          {isProfileComplete && (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/agendamentos')}
            >
              Ver Agendamentos
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Card de Histórico Médico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Histórico Médico
          </CardTitle>
          <CardDescription>
            Veja seus exames e receitas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline">
            Ver Histórico
          </Button>
        </CardContent>
      </Card>

      {/* Card de Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Perfil
          </CardTitle>
          <CardDescription>
            Atualize suas informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => navigate('/profile/complete?from=home')}
          >
            {isProfileComplete ? 'Editar Perfil' : 'Completar Perfil'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
