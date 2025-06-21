import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useAgendamento } from '@/hooks/useAgendamento'
import type { Agendamento } from '@/types/agendamento'
import { ArrowLeftCircle, Calendar, Clock, Plus, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const statusColors = {
  agendado: 'bg-blue-100 text-blue-800',
  confirmado: 'bg-green-100 text-green-800',
  em_andamento: 'bg-yellow-100 text-yellow-800',
  concluido: 'bg-gray-100 text-gray-800',
  cancelado: 'bg-red-100 text-red-800'
}

const statusLabels = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
  cancelado: 'Cancelado'
}

export function AgendamentosListPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { agendamentos, medicos, tratamentos, isLoading } = useAgendamento()
  const [userAgendamentos, setUserAgendamentos] = useState<Agendamento[]>([])

  useEffect(() => {
    if (user?.email) {
      // Filtrar agendamentos do usuário atual usando o email como ID único
      const filtered = agendamentos.filter(agendamento => 
        agendamento.pacienteId === user.email || agendamento.pacienteId === 'current_user'
      )
      setUserAgendamentos(filtered)
    }
  }, [agendamentos, user])

  const getMedicoById = (id: string) => {
    return medicos.find(medico => medico.id === id)
  }

  const getTratamentoById = (id: string) => {
    return tratamentos.find(tratamento => tratamento.id === id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando agendamentos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Agendamentos</h1>
            <p className="text-gray-600 mt-2">
              Visualize e gerencie suas consultas agendadas.
            </p>
          </div>
          <section className='flex items-center gap-2'>
     <Button onClick={() => navigate(-1)}>
         <ArrowLeftCircle/> Voltar
        </Button>
          <Button onClick={() => navigate('/agendamento')}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
          </section>
       
        </div>

        {userAgendamentos.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum agendamento encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Você ainda não tem consultas agendadas.
              </p>
              <Button onClick={() => navigate('/agendamento')}>
                Agendar Primeira Consulta
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userAgendamentos.map((agendamento) => {
              const medico = getMedicoById(agendamento.medicoId)
              const tratamento = getTratamentoById(agendamento.tratamentoId)

              return (
                <Card key={agendamento.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {tratamento?.nome || 'Tratamento não encontrado'}
                        </h3>
                        <p className="text-gray-600">
                          com {medico?.nome || 'Médico não encontrado'}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={statusColors[agendamento.status]}
                      >
                        {statusLabels[agendamento.status]}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(agendamento.data)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {formatTime(agendamento.horaInicio)} - {formatTime(agendamento.horaFim)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>{medico?.especialidade || 'Especialidade'}</span>
                      </div>
                    </div>

                    {medico && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2">Informações do Médico</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <p>CRM: {medico.crm}</p>
                          <p>Telefone: {medico.telefone}</p>
                          <p>Email: {medico.email}</p>
                          {medico.avaliacoes && (
                            <p>Avaliação: ⭐ {medico.avaliacoes}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {tratamento && (
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2">Detalhes do Tratamento</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {tratamento.descricao}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Duração: {tratamento.duracao} min
                          </span>
                          {tratamento.preco && (
                            <span>Valor: R$ {tratamento.preco}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {agendamento.observacoes && (
                      <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2">Observações</h4>
                        <p className="text-sm text-gray-600">
                          {agendamento.observacoes}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      {agendamento.status === 'agendado' && (
                        <>
                          <Button variant="outline" size="sm">
                            Reagendar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Cancelar
                          </Button>
                        </>
                      )}
                      {agendamento.status === 'concluido' && (
                        <Button variant="outline" size="sm">
                          Avaliar Consulta
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
