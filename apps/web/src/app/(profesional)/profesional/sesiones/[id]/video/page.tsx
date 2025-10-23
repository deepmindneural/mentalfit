import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sala de Videollamada | MentalFit',
  description: 'Sesión en vivo'
}

export default function PaginaVideoSesion() {
  return (
    <EnConstruccion
      titulo="Sala de Videollamada"
      descripcion="Sesión en vivo"
      funcionalidadesEsperadas={[
        'Iniciar videollamada',
        'Controles de audio/video',
        'Chat en sesión',
        'Compartir pantalla',
        'Grabación (con consentimiento)',
        'Finalizar sesión'
      ]}
    />
  )
}
