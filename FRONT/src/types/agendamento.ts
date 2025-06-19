export interface Medico {
  id: string
  nome: string
  crm: string
  especialidade: string
  email: string
  telefone: string
  tratamentosOferecidos: string[]
  disponibilidade: TimeSlot[]
  avaliacoes?: number
  fotoUrl?: string
}

export interface Tratamento {
  id: string
  nome: string
  descricao: string
  duracao: number // em minutos
  preco?: number
  especialidadeNecessaria: string
  medicosDisponiveis: string[] // IDs dos médicos
}

export interface TimeSlot {
  id: string
  medicoId: string
  data: string
  horaInicio: string
  horaFim: string
  disponivel: boolean
}

export interface Agendamento {
  id: string
  pacienteId: string
  medicoId: string
  tratamentoId: string
  data: string
  horaInicio: string
  horaFim: string
  status: AgendamentoStatus
  observacoes?: string
  createdAt: string
  updatedAt: string
}

export type AgendamentoStatus = 
  | 'agendado'
  | 'confirmado' 
  | 'em_andamento'
  | 'concluido'
  | 'cancelado'

export interface AgendamentoRequest {
  medicoId: string
  tratamentoId: string
  data: string
  horaInicio: string
  observacoes?: string
}

export interface SearchFilters {
  especialidade?: string
  tratamento?: string
  data?: string
  periodo?: 'manha' | 'tarde' | 'noite'
}
