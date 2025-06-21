// Script para adicionar dados de teste de agendamentos
// Execute este código no console do navegador para testar a tabela

const mockAgendamentos = [
  {
    id: 'agendamento_1',
    pacienteId: 'current_user', // Para compatibilidade com usuário logado atual
    medicoId: '1',
    tratamentoId: 'consulta-cardiologica',
    data: '2025-06-25',
    horaInicio: '09:00',
    horaFim: '10:00',
    status: 'agendado',
    observacoes: 'Consulta de rotina',
    createdAt: '2025-06-18T10:00:00.000Z',
    updatedAt: '2025-06-18T10:00:00.000Z'
  },
  {
    id: 'agendamento_2',
    pacienteId: 'current_user', // Para compatibilidade com usuário logado atual
    medicoId: '2',
    tratamentoId: 'consulta-dermatologica',
    data: '2025-06-28',
    horaInicio: '14:00',
    horaFim: '14:45',
    status: 'confirmado',
    observacoes: 'Avaliação de manchas na pele',
    createdAt: '2025-06-18T11:00:00.000Z',
    updatedAt: '2025-06-18T11:00:00.000Z'
  },
  {
    id: 'agendamento_3',
    pacienteId: 'current_user', // Para compatibilidade com usuário logado atual
    medicoId: '3',
    tratamentoId: 'consulta-ortopedica',
    data: '2025-06-20',
    horaInicio: '10:00',
    horaFim: '10:50',
    status: 'concluido',
    observacoes: 'Dor no joelho',
    createdAt: '2025-06-15T09:00:00.000Z',
    updatedAt: '2025-06-20T11:00:00.000Z'
  },
  {
    id: 'agendamento_4',
    pacienteId: 'current_user', // Para compatibilidade com usuário logado atual
    medicoId: '1',
    tratamentoId: 'eletrocardiograma',
    data: '2025-07-02',
    horaInicio: '08:00',
    horaFim: '08:30',
    status: 'agendado',
    observacoes: 'Exame preventivo',
    createdAt: '2025-06-18T12:00:00.000Z',
    updatedAt: '2025-06-18T12:00:00.000Z'
  },
  // Agendamentos de outros pacientes (para futura funcionalidade do médico)
  {
    id: 'agendamento_5',
    pacienteId: 'paciente@exemplo.com',
    medicoId: '1',
    tratamentoId: 'consulta-cardiologica',
    data: '2025-06-26',
    horaInicio: '10:00',
    horaFim: '11:00',
    status: 'agendado',
    observacoes: 'Consulta de acompanhamento',
    createdAt: '2025-06-18T13:00:00.000Z',
    updatedAt: '2025-06-18T13:00:00.000Z'
  }
]

// Para testar, execute no console:
// localStorage.setItem('videvida_agendamentos', JSON.stringify(mockAgendamentos))
// window.location.reload()

console.log('Para testar a tabela de agendamentos, execute:')
console.log('localStorage.setItem("videvida_agendamentos", JSON.stringify(' + JSON.stringify(mockAgendamentos, null, 2) + '))')
console.log('window.location.reload()')

export default mockAgendamentos
