import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Stethoscope, Calendar, Users, FileText, Clock } from 'lucide-react'

export const MedicoPage = () => {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Portal Médico</h1>
                        <p className="text-muted-foreground">Bem-vindo, {user?.name}</p>
                    </div>
                    <Button onClick={logout} variant="outline">
                        Sair
                    </Button>
                </div>

                {/* Cards de funcionalidades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Agenda
                            </CardTitle>
                            <CardDescription>
                                Gerencie sua agenda de consultas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">Ver Agenda</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Pacientes
                            </CardTitle>
                            <CardDescription>
                                Lista de seus pacientes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Ver Pacientes</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Prontuários
                            </CardTitle>
                            <CardDescription>
                                Acesse prontuários médicos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Ver Prontuários</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Stethoscope className="h-5 w-5" />
                                Prescrições
                            </CardTitle>
                            <CardDescription>
                                Gerencie receitas e prescrições
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Nova Prescrição</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Seção de consultas do dia */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Consultas de Hoje
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Nenhuma consulta agendada para hoje</p>
                                <p className="text-sm">Sua agenda está livre</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Estatísticas Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Pacientes Ativos</span>
                                <span className="font-semibold">24</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Consultas este mês</span>
                                <span className="font-semibold">42</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Prescrições emitidas</span>
                                <span className="font-semibold">18</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
