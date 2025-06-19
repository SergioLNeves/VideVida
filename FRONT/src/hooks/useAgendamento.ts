import type {
    Agendamento,
    AgendamentoRequest,
    Medico,
    Tratamento
} from '@/types/agendamento'
import { useEffect, useState } from 'react'

// Mock data - substituir por API real
const MOCK_MEDICOS: Medico[] = [
  {
    id: '1',
    nome: 'Dr. João Silva',
    crm: '12345-SP',
    especialidade: 'Cardiologia',
    email: 'joao.silva@videvida.com',
    telefone: '(11) 99999-9999',
    tratamentosOferecidos: ['consulta-cardiologica', 'eletrocardiograma'],
    disponibilidade: [],
    avaliacoes: 4.8
  },
  {
    id: '2',
    nome: 'Dra. Maria Santos',
    crm: '67890-SP',
    especialidade: 'Dermatologia',
    email: 'maria.santos@videvida.com',
    telefone: '(11) 88888-8888',
    tratamentosOferecidos: ['consulta-dermatologica', 'tratamento-acne'],
    disponibilidade: [],
    avaliacoes: 4.9
  },
  {
    id: '3',
    nome: 'Dr. Carlos Oliveira',
    crm: '11111-SP',
    especialidade: 'Ortopedia',
    email: 'carlos.oliveira@videvida.com',
    telefone: '(11) 77777-7777',
    tratamentosOferecidos: ['consulta-ortopedica', 'fisioterapia'],
    disponibilidade: [],
    avaliacoes: 4.7
  }
]

const MOCK_TRATAMENTOS: Tratamento[] = [
  {
    id: 'consulta-cardiologica',
    nome: 'Consulta Cardiológica',
    descricao: 'Consulta completa com cardiologista',
    duracao: 60,
    preco: 150,
    especialidadeNecessaria: 'Cardiologia',
    medicosDisponiveis: ['1']
  },
  {
    id: 'eletrocardiograma',
    nome: 'Eletrocardiograma',
    descricao: 'Exame de eletrocardiograma com interpretação',
    duracao: 30,
    preco: 80,
    especialidadeNecessaria: 'Cardiologia',
    medicosDisponiveis: ['1']
  },
  {
    id: 'consulta-dermatologica',
    nome: 'Consulta Dermatológica',
    descricao: 'Avaliação dermatológica completa',
    duracao: 45,
    preco: 120,
    especialidadeNecessaria: 'Dermatologia',
    medicosDisponiveis: ['2']
  },
  {
    id: 'tratamento-acne',
    nome: 'Tratamento de Acne',
    descricao: 'Protocolo completo para tratamento de acne',
    duracao: 60,
    preco: 200,
    especialidadeNecessaria: 'Dermatologia',
    medicosDisponiveis: ['2']
  },
  {
    id: 'consulta-ortopedica',
    nome: 'Consulta Ortopédica',
    descricao: 'Avaliação ortopédica e diagnóstico',
    duracao: 50,
    preco: 140,
    especialidadeNecessaria: 'Ortopedia',
    medicosDisponiveis: ['3']
  },
  {
    id: 'fisioterapia',
    nome: 'Sessão de Fisioterapia',
    descricao: 'Sessão de fisioterapia especializada',
    duracao: 45,
    preco: 100,
    especialidadeNecessaria: 'Ortopedia',
    medicosDisponiveis: ['3']
  }
]

export function useAgendamento() {
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 300))
        
        setMedicos(MOCK_MEDICOS)
        setTratamentos(MOCK_TRATAMENTOS)
        
        // Carregar agendamentos do localStorage
        const savedAgendamentos = localStorage.getItem('videvida_agendamentos')
        if (savedAgendamentos) {
          setAgendamentos(JSON.parse(savedAgendamentos))
        }
      } catch (err) {
        setError('Erro ao carregar dados')
        console.error('Erro ao carregar dados:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  const buscarMedicosPorEspecialidade = (especialidade: string): Medico[] => {
    return medicos.filter(medico => 
      medico.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    )
  }

  const buscarMedicosPorTratamento = (tratamentoId: string): Medico[] => {
    const tratamento = tratamentos.find(t => t.id === tratamentoId)
    if (!tratamento) return []
    
    return medicos.filter(medico => 
      tratamento.medicosDisponiveis.includes(medico.id)
    )
  }

  const buscarTratamentosPorMedico = (medicoId: string): Tratamento[] => {
    const medico = medicos.find(m => m.id === medicoId)
    if (!medico) return []
    
    return tratamentos.filter(tratamento =>
      medico.tratamentosOferecidos.includes(tratamento.id)
    )
  }

  const buscarTratamentosPorEspecialidade = (especialidade: string): Tratamento[] => {
    return tratamentos.filter(tratamento =>
      tratamento.especialidadeNecessaria.toLowerCase().includes(especialidade.toLowerCase())
    )
  }

  const criarAgendamento = async (request: AgendamentoRequest): Promise<Agendamento> => {
    try {
      setIsLoading(true)
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const novoAgendamento: Agendamento = {
        id: `agendamento_${Date.now()}`,
        pacienteId: 'current_user', // Substituir pelo ID do usuário atual
        medicoId: request.medicoId,
        tratamentoId: request.tratamentoId,
        data: request.data,
        horaInicio: request.horaInicio,
        horaFim: calculateEndTime(request.horaInicio, request.tratamentoId),
        status: 'agendado',
        observacoes: request.observacoes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const novosAgendamentos = [...agendamentos, novoAgendamento]
      setAgendamentos(novosAgendamentos)
      
      // Salvar no localStorage
      localStorage.setItem('videvida_agendamentos', JSON.stringify(novosAgendamentos))
      
      return novoAgendamento
    } catch (err) {
      setError('Erro ao criar agendamento')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const calculateEndTime = (horaInicio: string, tratamentoId: string): string => {
    const tratamento = tratamentos.find(t => t.id === tratamentoId)
    if (!tratamento) return horaInicio
    
    const [hours, minutes] = horaInicio.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + tratamento.duracao
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`
  }

  return {
    medicos,
    tratamentos,
    agendamentos,
    isLoading,
    error,
    buscarMedicosPorEspecialidade,
    buscarMedicosPorTratamento,
    buscarTratamentosPorMedico,
    buscarTratamentosPorEspecialidade,
    criarAgendamento
  }
}
