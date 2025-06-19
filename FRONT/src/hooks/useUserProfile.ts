import { useAuth } from '@/contexts/AuthContext'
import type { ProfileValidation, UserProfile } from '@/types/profile'
import { useEffect, useState } from 'react'

const REQUIRED_FIELDS = [
  'nome',
  'email', 
  'telefone',
  'cpf',
  'dataNascimento',
  'endereco.cep',
  'endereco.logradouro',
  'endereco.numero',
  'endereco.bairro',
  'endereco.cidade',
  'endereco.estado'
]

function validateProfile(profile: Partial<UserProfile>): ProfileValidation {
  const missingFields: string[] = []
  
  REQUIRED_FIELDS.forEach(field => {
    const fieldParts = field.split('.')
    let value = profile as any
    
    for (const part of fieldParts) {
      value = value?.[part]
    }
    
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      missingFields.push(field)
    }
  })
  
  const completionPercentage = Math.round(
    ((REQUIRED_FIELDS.length - missingFields.length) / REQUIRED_FIELDS.length) * 100
  )
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    completionPercentage
  }
}

export function useUserProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Simular carregamento do perfil (substituir por API real)
  useEffect(() => {
    if (!user) {
      setProfile(null)
      setIsLoading(false)
      return
    }
    
    const loadProfile = async () => {
      try {
        setIsLoading(true)
        
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Verificar se existe perfil salvo no localStorage
        const savedProfile = localStorage.getItem(`profile_${user.id}`)
        
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile)
          const validation = validateProfile(parsedProfile)
          
          setProfile({
            ...parsedProfile,
            isProfileComplete: validation.isValid
          })
        } else {
          // Criar perfil básico se não existir
          const basicProfile: UserProfile = {
            id: `profile_${user.id}`,
            userId: user.id,
            nome: user.name,
            email: user.email,
            isProfileComplete: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          
          setProfile(basicProfile)
        }
      } catch (err) {
        setError('Erro ao carregar perfil do usuário')
        console.error('Erro ao carregar perfil:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadProfile()
  }, [user])
  
  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!profile) return
    
    try {
      const updatedProfile = {
        ...profile,
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      const validation = validateProfile(updatedProfile)
      updatedProfile.isProfileComplete = validation.isValid
      
      // Salvar no localStorage (substituir por API real)
      localStorage.setItem(`profile_${profile.userId}`, JSON.stringify(updatedProfile))
      
      setProfile(updatedProfile)
    } catch (err) {
      setError('Erro ao atualizar perfil')
      throw err
    }
  }
  
  const getProfileValidation = (): ProfileValidation | null => {
    if (!profile) return null
    return validateProfile(profile)
  }
  
  return {
    profile,
    isLoading,
    error,
    updateProfile,
    getProfileValidation,
    isProfileComplete: profile?.isProfileComplete ?? false
  }
}
