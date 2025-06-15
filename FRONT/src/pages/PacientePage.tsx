import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Calendar, FileText } from 'lucide-react'

export const PacientePage = () => {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Portal do Paciente</h1>
                        <p className="text-muted-foreground">Bem-vindo, {user?.name}</p>
                    </div>
                    <Button onClick={logout} variant="outline">
                        Sair
                    </Button>
                </div>

                {/* Cards de funcionalidades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Consultas
                            </CardTitle>
                            <CardDescription>
                                Agende e gerencie suas consultas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">Agendar Consulta</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Histórico Médico
                            </CardTitle>
                            <CardDescription>
                                Veja seus exames e receitas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Ver Histórico</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Perfil
                            </CardTitle>
                            <CardDescription>
                                Atualize suas informações pessoais
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Editar Perfil</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Informações específicas do paciente */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Próximas Consultas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Nenhuma consulta agendada</p>
                            <p className="text-sm">Agende sua próxima consulta clicando no botão acima</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
