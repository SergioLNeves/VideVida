import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { checkEmailExists, mockLogin } from '@/services/mockAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [step, setStep] = useState<'email' | 'password'>('email')

    const navigate = useNavigate()
    const { login } = useAuth()

    // Mutation para checar se email existe
    const checkEmailMutation = useMutation({
        mutationFn: checkEmailExists,
        onSuccess: (exists) => {
            if (exists) {
                setStep('password')
                toast.success('Email encontrado! Digite sua senha.')
            } else {
                toast.info('Email não encontrado. Redirecionando para cadastro...')
                setTimeout(() => navigate('/register', { state: { email } }), 1500)
            }
        },
        onError: () => {
            toast.error('Erro ao verificar email. Tente novamente.')
        }
    })

    // Mutation para fazer login
    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            mockLogin(email, password),
        onSuccess: (user) => {
            login(user)
            toast.success(`Bem-vindo, ${user.name}!`)

            // Redireciona baseado no tipo de usuário
            const redirectPath = user.type === 'admin' ? '/admin' :
                user.type === 'medico' ? '/medico' : '/paciente'
            navigate(redirectPath)
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) {
            toast.error('Por favor, digite um email válido')
            return
        }
        checkEmailMutation.mutate(email)
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!password.trim()) {
            toast.error('Por favor, digite sua senha')
            return
        }
        loginMutation.mutate({ email, password })
    }

    const handleBackToEmail = () => {
        setStep('email')
        setPassword('')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Entrar no VideVida</CardTitle>
                    <CardDescription>
                        {step === 'email'
                            ? 'Digite seu email para continuar'
                            : `Digite a senha para ${email}`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {step === 'email' ? (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    disabled={checkEmailMutation.isPending}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={checkEmailMutation.isPending}
                            >
                                {checkEmailMutation.isPending ? 'Verificando...' : 'Continuar'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email-display">Email</Label>
                                <Input
                                    id="email-display"
                                    value={email}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite sua senha"
                                    disabled={loginMutation.isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleBackToEmail}
                                    disabled={loginMutation.isPending}
                                >
                                    Usar outro email
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
