import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { UserRegistrationPanel } from '@/pages/admin/components/UserRegistrationPanel'
import { Activity, BarChart3, Database, Settings, Shield, Users } from 'lucide-react'

export const AdminPage = () => {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                        <p className="text-muted-foreground">Bem-vindo, {user?.name}</p>
                    </div>
                    <Button onClick={logout} variant="outline">
                        Sair
                    </Button>
                </div>

                {/* Cards de funcionalidades administrativas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Gerenciar Usuários
                            </CardTitle>
                            <CardDescription>
                                Adicione, edite ou remova usuários do sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">Gerenciar Usuários</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Relatórios
                            </CardTitle>
                            <CardDescription>
                                Visualize relatórios e estatísticas do sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Ver Relatórios</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Configurações
                            </CardTitle>
                            <CardDescription>
                                Configure parâmetros gerais do sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Configurações</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Segurança
                            </CardTitle>
                            <CardDescription>
                                Gerencie permissões e logs de acesso
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Logs de Segurança</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                Backup
                            </CardTitle>
                            <CardDescription>
                                Gerencie backups e restaurações
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Backup Sistema</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Monitoramento
                            </CardTitle>
                            <CardDescription>
                                Monitore performance e saúde do sistema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">Status Sistema</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Dashboard com estatísticas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estatísticas Gerais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total de Usuários</span>
                                <span className="font-semibold">156</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Médicos Ativos</span>
                                <span className="font-semibold">23</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Pacientes Cadastrados</span>
                                <span className="font-semibold">128</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Consultas este mês</span>
                                <span className="font-semibold">342</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Atividade Recente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm">Novo usuário cadastrado</span>
                                    <span className="text-xs text-muted-foreground ml-auto">há 2 min</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm">Backup realizado com sucesso</span>
                                    <span className="text-xs text-muted-foreground ml-auto">há 1 hora</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span className="text-sm">Consulta agendada</span>
                                    <span className="text-xs text-muted-foreground ml-auto">há 3 horas</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Painel de Usuários Registrados na Sessão */}
                <div className="mt-8">
                    <UserRegistrationPanel />
                </div>
            </div>
        </div>
    )
}
