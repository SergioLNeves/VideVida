import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { ProfileValidation, UserProfile } from '@/types/profile'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ProfileStatusCardProps {
  profile: UserProfile | null
  isProfileComplete: boolean
  validation: ProfileValidation | null
}

export function ProfileStatusCard({ 
  profile, 
  isProfileComplete, 
  validation 
}: ProfileStatusCardProps) {
  const navigate = useNavigate()

  if (!profile) return null

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isProfileComplete ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            )}
            <div>
              <h3 className="font-semibold">
                {isProfileComplete ? 'Perfil Completo' : 'Perfil Incompleto'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {validation && `${validation.completionPercentage}% completo`}
              </p>
            </div>
          </div>
          {!isProfileComplete && (
            <Button 
              onClick={() => navigate('/profile/complete?from=home')}
              size="sm"
            >
              Completar Perfil
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
