import { useRegisteredUsers } from '@/hooks/useRegisteredUsers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const UserRegistrationPanel = () => {
    const { registeredUsers, stats, clearUsers, refreshData } = useRegisteredUsers()

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Sistema de Registro Fake</CardTitle>
                    <CardDescription>
                        Usuários registrados na sessão atual
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                            <div className="text-sm text-muted-foreground">Total</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{stats.registered}</div>
                            <div className="text-sm text-muted-foreground">Registrados</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">{stats.pacientes}</div>
                            <div className="text-sm text-muted-foreground">Pacientes</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                            <div className="text-2xl font-bold text-gray-600">{stats.defaults}</div>
                            <div className="text-sm text-muted-foreground">Padrão</div>
                        </div>
                    </div>

                    {/* Lista de usuários registrados */}
                    {registeredUsers.length > 0 ? (
                        <div className="space-y-2">
                            <h4 className="font-semibold">Usuários Registrados nesta Sessão:</h4>
                            {registeredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex justify-between items-center p-3 border rounded-lg bg-green-50 border-green-200"
                                >
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {user.email} • {user.type}
                                        </div>
                                    </div>
                                    <div className="text-xs text-green-600 font-medium">
                                        ID: {user.id}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Nenhum usuário registrado nesta sessão ainda.</p>
                            <p className="text-sm mt-1">Registre um novo usuário para vê-lo aparecer aqui!</p>
                        </div>
                    )}

                    {/* Botões de ação */}
                    <div className="flex gap-2 pt-4">
                        <Button
                            onClick={refreshData}
                            variant="outline"
                            size="sm"
                        >
                            🔄 Atualizar
                        </Button>
                        {registeredUsers.length > 0 && (
                            <Button
                                onClick={clearUsers}
                                variant="destructive"
                                size="sm"
                            >
                                🗑️ Limpar Sessão
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
