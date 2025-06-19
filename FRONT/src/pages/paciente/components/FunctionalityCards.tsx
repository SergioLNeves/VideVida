import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, FileText, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface FunctionalityCardsProps {
  isProfileComplete: boolean
}

export function FunctionalityCards({ isProfileComplete }: FunctionalityCardsProps) {
  const navigate = useNavigate()

  const handleAgendarConsulta = () => {
    if (isProfileComplete) {
      navigate('/agendamento')
    } else {
      navigate('/profile/complete')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card de Consultas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Consultas
            {!isProfileComplete && (
              <Badge variant="secondary" className="ml-2">
                Requer perfil completo
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Agende e gerencie suas consultas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
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
            onClick={() => navigate('/profile/complete')}
          >
            {isProfileComplete ? 'Editar Perfil' : 'Completar Perfil'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
