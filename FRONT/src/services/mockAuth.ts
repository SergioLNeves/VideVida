import type { User } from '@/types/auth'

// Mock de usuários cadastrados
export const mockUsers: User[] = [
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

// Simula delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Simula checagem se email existe
export const checkEmailExists = async (email: string): Promise<boolean> => {
    await delay(500) // Simula delay da API
    return mockUsers.some(user => user.email === email)
}

// Simula login
export const mockLogin = async (email: string, password: string): Promise<User> => {
    await delay(800) // Simula delay da API

    const user = mockUsers.find(u => u.email === email && u.password === password)

    if (!user) {
        throw new Error('Email ou senha incorretos')
    }

    return user
}

// Simula registro
export const mockRegister = async (userData: Omit<User, 'id'>): Promise<User> => {
    await delay(1000) // Simula delay da API

    // Verifica se email já existe
    if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email já cadastrado')
    }

    const newUser: User = {
        ...userData,
        id: Date.now().toString()
    }

    // Simula salvar no "backend"
    mockUsers.push(newUser)

    return newUser
}
