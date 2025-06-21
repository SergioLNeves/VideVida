import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/AuthContext'
import { useAgendamento } from '@/hooks/useAgendamento'
import { useUserProfile } from '@/hooks/useUserProfile'
import { Calendar, Clock, FileText, Stethoscope, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const PacientePage = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { isProfileComplete, getProfileValidation } = useUserProfile()
    const { agendamentos, medicos, tratamentos } = useAgendamento()
    

    // Filtrar agendamentos do usuário atual
    const userAgendamentos = agendamentos.filter(agendamento => 
        agendamento.pacienteId === 'current_user'
    )

    // Função auxiliar para encontrar médico por ID
    const getMedicoById = (id: string) => {
        return medicos.find(medico => medico.id === id)
    }

    // Função auxiliar para encontrar tratamento por ID
    const getTratamentoById = (id: string) => {
        return tratamentos.find(tratamento => tratamento.id === id)
    }

    // Função para formatar data
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR')
    }

    // Labels para status
    const statusLabels = {
        agendado: 'Agendado',
        confirmado: 'Confirmado',
        em_andamento: 'Em Andamento',
        concluido: 'Concluído',
        cancelado: 'Cancelado'
    }

    // Cores para status
    const statusColors = {
        agendado: 'bg-blue-100 text-blue-800',
        confirmado: 'bg-green-100 text-green-800',
        em_andamento: 'bg-yellow-100 text-yellow-800',
        concluido: 'bg-gray-100 text-gray-800',
        cancelado: 'bg-red-100 text-red-800'
    }

    const handleAgendarConsulta = () => {
        if (isProfileComplete) {
            navigate('/agendamento')
        } else {
            navigate('/profile/complete?from=agendamento')
        }
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Portal do Paciente</h1>
                        <p className="text-muted-foreground">Bem-vindo, {user?.name}</p>
                    </div>
                    <section className='gap-2 flex flex-col md:flex-row'>
                    <Button  onClick={() => navigate('/profile/complete?from=home')}  className='text-primary-foreground'>
                        <User className="h-5 w-5" /> Perfil
                    </Button>
                    <Button onClick={logout} variant="outline">
                        Sair
                    </Button>
                    </section>
                </header>

                {/* Cards de funcionalidades */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Consulta */}
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
                        <CardContent className="space-y-2">
                            <Button 
                                className="w-full" 
                                onClick={handleAgendarConsulta}
                            >
                               Agendar Consulta
                            </Button>
                            {isProfileComplete && (
                                <Button 
                                    className="w-full" 
                                    variant="outline"
                                    onClick={() => navigate('/agendamentos')}
                                >
                                    Ver Agendamentos
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                   {/* Histórico Médico */}
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
                </div>

                {/* Consultas Agendadas */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Minhas Consultas</span>
                            {userAgendamentos.length > 0 && (
                                <Button 
                                    size="sm" 
                                    onClick={() => navigate('/agendamentos')}
                                    variant="outline"
                                >
                                    Ver Todas
                                </Button>
                            )}
                        </CardTitle>
                        <CardDescription>
                            {userAgendamentos.length > 0 
                                ? `Você tem ${userAgendamentos.length} consulta(s) agendada(s)`
                                : 'Nenhuma consulta agendada no momento'
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {userAgendamentos.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Nenhuma consulta agendada</p>
                                <p className="text-sm">Agende sua próxima consulta clicando no botão acima</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Horário</TableHead>
                                            <TableHead>Médico</TableHead>
                                            <TableHead>Tratamento</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {userAgendamentos.slice(0, 5).map((agendamento) => {
                                            const medico = getMedicoById(agendamento.medicoId)
                                            const tratamento = getTratamentoById(agendamento.tratamentoId)
                                            
                                            return (
                                                <TableRow key={agendamento.id}>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            {formatDate(agendamento.data)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                                            {agendamento.horaInicio} - {agendamento.horaFim}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{medico?.nome || 'N/A'}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {medico?.especialidade}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                                                            <div>
                                                                <p className="font-medium">
                                                                    {tratamento?.nome || 'N/A'}
                                                                </p>
                                                                {tratamento?.duracao && (
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {tratamento.duracao} min
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge 
                                                            variant="secondary"
                                                            className={statusColors[agendamento.status]}
                                                        >
                                                            {statusLabels[agendamento.status]}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-1">
                                                            {agendamento.status === 'agendado' && (
                                                                <>
                                                                    <Button size="sm" variant="outline">
                                                                        Reagendar
                                                                    </Button>
                                                                    <Button size="sm" variant="destructive">
                                                                        Cancelar
                                                                    </Button>
                                                                </>
                                                            )}
                                                            {agendamento.status === 'concluido' && (
                                                                <Button size="sm" variant="outline">
                                                                    Avaliar
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                                {userAgendamentos.length > 5 && (
                                    <div className="mt-4 text-center">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => navigate('/agendamentos')}
                                        >
                                            Ver todas as {userAgendamentos.length} consultas
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
