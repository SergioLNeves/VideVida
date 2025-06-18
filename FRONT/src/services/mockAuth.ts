import type { User } from '@/types/auth'

// Chave para armazenar usuários registrados na sessão
const REGISTERED_USERS_KEY = 'videvida_registered_users'

// Mock de usuários padrão do sistema
const defaultUsers: User[] = [
    {
        id: '1',
        email: 'paciente@email.com',
        password: '123456',
        name: 'João Silva',
        type: 'paciente'
    },
    {
        id: '2',
        email: 'medico@email.com',
        password: '123456',
        name: 'Dr. Maria Santos',
        type: 'medico'
    },
    {
        id: '3',
        email: 'admin@email.com',
        password: '123456',
        name: 'Admin Sistema',
        type: 'admin'
    },
    {
        id: '4',
        email: 'paciente2@email.com',
        password: '123456',
        name: 'Ana Costa',
        type: 'paciente'
    },
    {
        id: '5',
        email: 'medico2@email.com',
        password: '123456',
        name: 'Dr. Pedro Oliveira',
        type: 'medico'
    }
]

// Função para obter usuários registrados do sessionStorage
const getRegisteredUsers = (): User[] => {
    try {
        const stored = sessionStorage.getItem(REGISTERED_USERS_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

// Função para salvar usuários registrados no sessionStorage
const saveRegisteredUsers = (users: User[]): void => {
    try {
        sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
    } catch (error) {
        console.error('Erro ao salvar usuários registrados:', error)
    }
}

// Função para obter todos os usuários (padrão + registrados)
const getAllUsers = (): User[] => {
    const registeredUsers = getRegisteredUsers()
    return [...defaultUsers, ...registeredUsers]
}

// Mock de usuários cadastrados (agora dinâmico)
export const mockUsers = getAllUsers()

// Simula checagem se email existe
export const checkEmailExists = async (email: string): Promise<boolean> => {
    const allUsers = getAllUsers()
    return allUsers.some(user => user.email === email)
}

// Simula login
export const mockLogin = async (email: string, password: string): Promise<User> => {
    const allUsers = getAllUsers()
    const user = allUsers.find(u => u.email === email && u.password === password)

    if (!user) {
        throw new Error('Email ou senha incorretos')
    }

    return user
}

// Simula registro
export const mockRegister = async (userData: Omit<User, 'id'>): Promise<User> => {
    const allUsers = getAllUsers()

    // Verifica se email já existe
    if (allUsers.some(u => u.email === userData.email)) {
        throw new Error('Email já cadastrado')
    }

    const newUser: User = {
        ...userData,
        id: Date.now().toString()
    }

    // Salva o novo usuário no sessionStorage
    const registeredUsers = getRegisteredUsers()
    const updatedRegisteredUsers = [...registeredUsers, newUser]
    saveRegisteredUsers(updatedRegisteredUsers)

    console.log('📝 Novo usuário registrado:', newUser.name, '(' + newUser.email + ')')

    return newUser
}

// Função utilitária para limpar usuários registrados da sessão
export const clearRegisteredUsers = (): void => {
    try {
        sessionStorage.removeItem(REGISTERED_USERS_KEY)
        console.log('🧹 Usuários registrados da sessão foram limpos')
    } catch (error) {
        console.error('Erro ao limpar usuários registrados:', error)
    }
}

// Função utilitária para obter todos os usuários registrados na sessão
export const getSessionRegisteredUsers = (): User[] => {
    return getRegisteredUsers()
}

// Função utilitária para obter estatísticas dos usuários
export const getUserStats = () => {
    const registeredUsers = getRegisteredUsers()
    const allUsers = getAllUsers()

    return {
        total: allUsers.length,
        defaults: defaultUsers.length,
        registered: registeredUsers.length,
        pacientes: allUsers.filter(u => u.type === 'paciente').length,
        medicos: allUsers.filter(u => u.type === 'medico').length,
        admins: allUsers.filter(u => u.type === 'admin').length
    }
}
