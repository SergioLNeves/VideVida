import { useState, useEffect } from 'react'
import { getUserStats, getSessionRegisteredUsers, clearRegisteredUsers } from '@/services/mockAuth'
import type { User } from '@/types/auth'

interface UseRegisteredUsersReturn {
    registeredUsers: User[]
    stats: {
        total: number
        defaults: number
        registered: number
        pacientes: number
        medicos: number
        admins: number
    }
    clearUsers: () => void
    refreshData: () => void
}

export const useRegisteredUsers = (): UseRegisteredUsersReturn => {
    const [registeredUsers, setRegisteredUsers] = useState<User[]>([])
    const [stats, setStats] = useState({
        total: 0,
        defaults: 0,
        registered: 0,
        pacientes: 0,
        medicos: 0,
        admins: 0
    })

    const refreshData = () => {
        setRegisteredUsers(getSessionRegisteredUsers())
        setStats(getUserStats())
    }

    const clearUsers = () => {
        clearRegisteredUsers()
        refreshData()
    }

    useEffect(() => {
        refreshData()
    }, [])

    return {
        registeredUsers,
        stats,
        clearUsers,
        refreshData
    }
}
