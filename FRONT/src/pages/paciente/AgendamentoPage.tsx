import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAgendamento } from '@/hooks/useAgendamento'
import { useUserProfile } from '@/hooks/useUserProfile'
import type { AgendamentoRequest, Medico, Tratamento } from '@/types/agendamento'
import { ArrowLeftCircle, Clock, Stethoscope, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type SearchMode = 'medico' | 'tratamento'

export function AgendamentoPage() {
  const navigate = useNavigate()
  const { profile, isProfileComplete } = useUserProfile()
  const { 
    tratamentos, 
    buscarMedicosPorEspecialidade,
    buscarMedicosPorTratamento,
    buscarTratamentosPorMedico,
    criarAgendamento,
    isLoading 
  } = useAgendamento()

  const [searchMode, setSearchMode] = useState<SearchMode>('medico')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null)
  const [selectedTratamento, setSelectedTratamento] = useState<Tratamento | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [filteredMedicos, setFilteredMedicos] = useState<Medico[]>([])
  const [filteredTratamentos, setFilteredTratamentos] = useState<Tratamento[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Verificar se o perfil está completo
  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Perfil Incompleto</CardTitle>
            <CardDescription>
              Para agendar consultas, você precisa completar seu perfil primeiro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/profile/complete?from=agendamento')} className="w-full">
              Completar Perfil
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredMedicos([])
      setFilteredTratamentos([])
      return
    }

    if (searchMode === 'medico') {
      const medicosPorEspecialidade = buscarMedicosPorEspecialidade(searchTerm)
      setFilteredMedicos(medicosPorEspecialidade)
      setFilteredTratamentos([])
    } else {
      const tratamentosPorNome = tratamentos.filter(tratamento =>
        tratamento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tratamento.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredTratamentos(tratamentosPorNome)
      setFilteredMedicos([])
    }
  }

  const handleSelectMedico = (medico: Medico) => {
    setSelectedMedico(medico)
    // Buscar tratamentos oferecidos pelo médico
    const tratamentosDoMedico = buscarTratamentosPorMedico(medico.id)
    setFilteredTratamentos(tratamentosDoMedico)
  }

  const handleSelectTratamento = (tratamento: Tratamento) => {
    setSelectedTratamento(tratamento)
    // Se não tiver médico selecionado, buscar médicos que oferecem o tratamento
    if (!selectedMedico) {
      const medicosDoTratamento = buscarMedicosPorTratamento(tratamento.id)
      setFilteredMedicos(medicosDoTratamento)
    }
  }

  const canSchedule = selectedMedico && selectedTratamento && selectedDate && selectedTime

  const handleSchedule = async () => {
    if (!canSchedule) return

    try {
      setIsSubmitting(true)

      const request: AgendamentoRequest = {
        medicoId: selectedMedico.id,
        tratamentoId: selectedTratamento.id,
        data: selectedDate,
        horaInicio: selectedTime
      }

      await criarAgendamento(request)
      
      toast.success('Consulta agendada com sucesso!')
      
      // Redirecionar para página de confirmação ou lista de agendamentos
      navigate('/agendamentos')
    } catch (error) {
      toast.error('Erro ao agendar consulta. Tente novamente.')
      console.error('Erro ao agendar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Gerar horários disponíveis (mock)
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <section className='flex justify-between items-center mb-8'>
 <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Agendar Consulta</h1>
          <p className="text-gray-600 mt-2">
            Olá, {profile?.nome}! Escolha como deseja buscar sua consulta.
          </p>
        </div>
        <Button onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeftCircle/> Voltar
        </Button>
        </section>
       

        {/* Modo de Busca */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Como você quer buscar?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                variant={searchMode === 'medico' ? 'default' : 'outline'}
                onClick={() => setSearchMode('medico')}
                className="flex-1"
              >
                <User className="w-4 h-4 mr-2" />
                Por Médico/Especialidade
              </Button>
              <Button
                variant={searchMode === 'tratamento' ? 'default' : 'outline'}
                onClick={() => setSearchMode('tratamento')}
                className="flex-1"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Por Tratamento
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Busca */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {searchMode === 'medico' ? 'Buscar por Especialidade' : 'Buscar Tratamento'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder={
                  searchMode === 'medico' 
                    ? 'Ex: Cardiologia, Dermatologia...' 
                    : 'Ex: Consulta, Exame...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch}>Buscar</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Médicos */}
          {filteredMedicos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Médicos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredMedicos.map((medico) => (
                  <div
                    key={medico.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedMedico?.id === medico.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelectMedico(medico)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{medico.nome}</h3>
                        <p className="text-sm text-gray-600">{medico.especialidade}</p>
                        <p className="text-sm text-gray-500">CRM: {medico.crm}</p>
                      </div>
                      {medico.avaliacoes && (
                        <Badge variant="secondary">
                          ⭐ {medico.avaliacoes}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Lista de Tratamentos */}
          {filteredTratamentos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tratamentos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredTratamentos.map((tratamento) => (
                  <div
                    key={tratamento.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTratamento?.id === tratamento.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelectTratamento(tratamento)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{tratamento.nome}</h3>
                        <p className="text-sm text-gray-600">{tratamento.descricao}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {tratamento.duracao} min
                          </span>
                          {tratamento.preco && (
                            <span>R$ {tratamento.preco}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Seleção de Data e Hora */}
        {selectedMedico && selectedTratamento && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Escolha Data e Horário</CardTitle>
              <CardDescription>
                Agendando {selectedTratamento.nome} com {selectedMedico.nome}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Horário</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleSchedule}
                disabled={!canSchedule || isSubmitting}
                className="w-full mt-6"
                size="lg"
              >
                {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
