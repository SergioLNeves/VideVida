import { z } from 'zod'

// API Response schemas matching the backend
export const loginResponseSchema = z.object({
  token: z.string()
})

export const registerResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  type: z.enum(['patient', 'doctor', 'nurse', 'admin', 'receptionist']),
  profile: z.object({
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string(),
    date_of_birth: z.string().optional(),
    cpf: z.string().optional(),
    crm: z.string().optional(),
    coren: z.string().optional(),
    speciality: z.string().optional()
  })
})

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  type: z.enum(['patient', 'doctor', 'nurse', 'admin', 'receptionist']),
  profile: z.object({
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string(),
    date_of_birth: z.string().optional(),
    cpf: z.string().optional(),
    crm: z.string().optional(),
    coren: z.string().optional(),
    speciality: z.string().optional()
  })
})

export type LoginResponse = z.infer<typeof loginResponseSchema>
export type RegisterResponse = z.infer<typeof registerResponseSchema>
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type RegisterRequest = z.infer<typeof registerRequestSchema>

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/v1'

// Função helper para fazer requisições
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData.message || `Erro ${response.status}: ${response.statusText}`
    throw new Error(errorMessage)
  }

  return response.json()
}

// Service para login
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    return loginResponseSchema.parse(response)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Falha no login: ${error.message}`)
    }
    throw new Error('Erro inesperado durante o login')
  }
}

// Service para registro
export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await apiRequest<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    return registerResponseSchema.parse(response)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Falha no registro: ${error.message}`)
    }
    throw new Error('Erro inesperado durante o registro')
  }
}
