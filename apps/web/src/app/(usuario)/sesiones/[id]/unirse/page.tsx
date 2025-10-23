import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sala de Videollamada | MentalFit',
  description: 'Sesión en vivo'
}

export default function PaginaUnirseSesion() {
  return (
    <EnConstruccion
      titulo="Sala de Videollamada"
      descripcion="Sesión en vivo"
      funcionalidadesEsperadas={[
        'Acceder a videollamada',
        'Verificar audio/video',
        'Sala de espera',
        'Chat con terapeuta',
        'Finalizar sesión',
        'Soporte técnico'
      ]}
    />
  )
}
