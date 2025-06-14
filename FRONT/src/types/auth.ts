import { z } from 'zod'

// User types matching API
export type UserType = 'patient' | 'doctor' | 'nurse' | 'admin' | 'receptionist'

// User profile interface
export interface UserProfile {
  first_name: string
  last_name: string
  phone: string
  date_of_birth?: string
  cpf?: string
  crm?: string
  coren?: string
  speciality?: string
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(128, 'Senha deve ter no máximo 128 caracteres')
})

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(128, 'Senha deve ter no máximo 128 caracteres'),
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
  type: z.enum(['patient', 'doctor', 'nurse', 'admin', 'receptionist']),
  profile: z.object({
    first_name: z.string().min(1, 'Nome é obrigatório'),
    last_name: z.string().min(1, 'Sobrenome é obrigatório'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    date_of_birth: z.string().optional(),
    cpf: z.string().optional(),
    crm: z.string().optional(),
    coren: z.string().optional(),
    speciality: z.string().optional()
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
