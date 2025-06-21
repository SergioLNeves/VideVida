import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DatePicker } from '@/components/ui/date-picker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUserProfile } from '@/hooks/useUserProfile'
import type { UserProfile } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const profileSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos'),
  dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  convenio: z.string().optional(),
  endereco: z.object({
    cep: z.string().min(8, 'CEP deve ter 8 dígitos'),
    logradouro: z.string().min(1, 'Logradouro é obrigatório'),
    numero: z.string().min(1, 'Número é obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().min(1, 'Bairro é obrigatório'),
    cidade: z.string().min(1, 'Cidade é obrigatória'),
    estado: z.string().min(2, 'Estado é obrigatório')
  })
})

type ProfileFormData = z.infer<typeof profileSchema>

export function ProfileCompletionPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { profile, updateProfile, getProfileValidation, isLoading } = useUserProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Detectar de onde o usuário veio
  const from = searchParams.get('from') || 'home' // padrão é 'home'

  const validation = getProfileValidation()

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: profile?.nome || '',
      telefone: profile?.telefone || '',
      cpf: profile?.cpf || '',
      dataNascimento: profile?.dataNascimento || '',
      convenio: profile?.convenio || '',
      endereco: {
        cep: profile?.endereco?.cep || '',
        logradouro: profile?.endereco?.logradouro || '',
        numero: profile?.endereco?.numero || '',
        complemento: profile?.endereco?.complemento || '',
        bairro: profile?.endereco?.bairro || '',
        cidade: profile?.endereco?.cidade || '',
        estado: profile?.endereco?.estado || ''
      }
    }
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        nome: profile.nome || '',
        telefone: profile.telefone || '',
        cpf: profile.cpf || '',
        dataNascimento: profile.dataNascimento || '',
        convenio: profile.convenio || '',
        endereco: {
          cep: profile.endereco?.cep || '',
          logradouro: profile.endereco?.logradouro || '',
          numero: profile.endereco?.numero || '',
          complemento: profile.endereco?.complemento || '',
          bairro: profile.endereco?.bairro || '',
          cidade: profile.endereco?.cidade || '',
          estado: profile.endereco?.estado || ''
        }
      })
    }
  }, [profile, form])

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true)
      
      const updatedProfile: Partial<UserProfile> = {
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        dataNascimento: data.dataNascimento,
        convenio: data.convenio,
        endereco: data.endereco
      }

      await updateProfile(updatedProfile)
      
      const currentValidation = getProfileValidation()
      
      if (currentValidation?.isValid) {
        toast.success('Perfil completado com sucesso!')
        // Redirecionar baseado na origem
        if (from === 'agendamento') {
          navigate('/agendamento')
        } else {
          navigate('/paciente') // volta para home do paciente
        }
      } else {
        toast.success('Progresso salvo! Continue preenchendo os campos obrigatórios.')
      }
      
    } catch (error) {
      toast.error('Erro ao atualizar perfil. Tente novamente.')
      console.error('Erro ao atualizar perfil:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Complete seu Perfil</CardTitle>
            <CardDescription>
              Para agendar consultas, precisamos de algumas informações adicionais.
            </CardDescription>
            {validation && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progresso do perfil
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {validation.completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${validation.completionPercentage}%` }}
                  ></div>
                </div>
                {validation.missingFields.length > 0 && (
                  <p className="text-sm text-amber-600 mt-2">
                    {validation.missingFields.length} campo(s) obrigatório(s) pendente(s)
                  </p>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                  
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="(11) 99999-9999" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="000.000.000-00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="dataNascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value ? new Date(field.value) : undefined}
                            onChange={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                            placeholder="Selecione sua data de nascimento"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="convenio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Convênio (opcional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nome do convênio" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                </div>

                {/* Endereço */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Endereço</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="endereco.cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="00000-000" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endereco.logradouro"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Logradouro</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Rua, Avenida, etc." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="endereco.numero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endereco.complemento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento (opcional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Apto, Casa, etc." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="endereco.bairro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endereco.cidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endereco.estado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="SP" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Salvando...' : 
                     validation?.isValid ? 'Finalizar Perfil' : 'Salvar Progresso'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
