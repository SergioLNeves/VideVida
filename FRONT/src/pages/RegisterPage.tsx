import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { mockRegister } from '@/services/mockAuth'
import type { UserType } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export const RegisterPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: location.state?.email || '',
        password: '',
        confirmPassword: '',
        name: '',
        type: 'paciente' as UserType
    })

    const registerMutation = useMutation({
        mutationFn: (userData: { email: string; password: string; name: string; type: UserType }) =>
            mockRegister(userData),
        onSuccess: (user) => {
            toast.success('Cadastro realizado com sucesso!')
            login(user)

            // Redireciona baseado no tipo de usuário
            const redirectPath = user.type === 'admin' ? '/admin' :
                user.type === 'medico' ? '/medico' : '/paciente'
            navigate(redirectPath)
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validações
        if (!formData.email.trim()) {
            toast.error('Email é obrigatório')
            return
        }

        if (!formData.name.trim()) {
            toast.error('Nome é obrigatório')
            return
        }

        if (!formData.password.trim()) {
            toast.error('Senha é obrigatória')
            return
        }

        if (formData.password.length < 6) {
            toast.error('Senha deve ter pelo menos 6 caracteres')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Senhas não coincidem')
            return
        }

        registerMutation.mutate({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            type: formData.type
        })
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Criar conta no VideVida</CardTitle>
                    <CardDescription>
                        Preencha os dados para criar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="seu@email.com"
                                disabled={registerMutation.isPending}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Seu nome completo"
                                disabled={registerMutation.isPending}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo de usuário</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value: UserType) => handleInputChange('type', value)}
                                disabled={registerMutation.isPending}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paciente">Paciente</SelectItem>
                                    <SelectItem value="medico">Médico</SelectItem>
                                    <SelectItem value="admin">Administrador</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                disabled={registerMutation.isPending}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar senha</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                placeholder="Digite a senha novamente"
                                disabled={registerMutation.isPending}
                            />
                        </div>

                        <div className="space-y-2">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? 'Criando conta...' : 'Criar conta'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate('/login')}
                                disabled={registerMutation.isPending}
                            >
                                Voltar ao login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
