import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, HeartPulse, Home, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center shadow-2xl">
                <CardHeader className="pb-6">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <HeartPulse className="h-16 w-16 text-blue-500 animate-pulse" />
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold">
                                !
                            </div>
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Página Não Encontrada
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                        Erro 404
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-300">
                            Ops! Esta página não está disponível no momento.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Como em um diagnóstico médico, vamos investigar: a página pode ter sido movida, removida ou você digitou o endereço incorreto.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button 
                            onClick={handleGoBack}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar
                        </Button>
                        
                        <Button 
                            onClick={handleGoHome}
                            className="flex items-center gap-2"
                        >
                            <Home className="h-4 w-4" />
                            Página Inicial
                        </Button>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Search className="h-4 w-4" />
                            <span>Precisa de ajuda? Nossa equipe de suporte está sempre disponível</span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            ViDeVida - Cuidando da sua saúde digital
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Elementos decorativos */}
            <div className="absolute top-10 left-10 opacity-20">
                <HeartPulse className="h-12 w-12 text-blue-300 animate-pulse" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-20">
                <HeartPulse className="h-8 w-8 text-indigo-300 animate-pulse" />
            </div>
            <div className="absolute top-1/2 left-5 opacity-10">
                <HeartPulse className="h-6 w-6 text-blue-400 animate-pulse" />
            </div>
        </div>
    )
}
