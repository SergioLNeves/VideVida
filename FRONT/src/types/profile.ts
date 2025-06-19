export interface UserProfile {
  id: string
  userId: string
  nome: string
  email: string
  telefone?: string
  cpf?: string
  dataNascimento?: string
  endereco?: Address
  dadosMedicos?: MedicalData
  isProfileComplete: boolean
  createdAt: string
  updatedAt: string
}

export interface Address {
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export interface MedicalData {
  tipoSanguineo?: string
  alergias?: string[]
  medicamentosEmUso?: string[]
  condicoesMedicas?: string[]
  convenioMedico?: string
  numeroConvenio?: string
}

export interface ProfileValidation {
  isValid: boolean
  missingFields: string[]
  completionPercentage: number
}
