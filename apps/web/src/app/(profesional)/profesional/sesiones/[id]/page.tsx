import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle de Sesión | MentalFit',
  description: 'Vista individual de sesión'
}

export default function PaginaDetalleSesion() {
  return (
    <EnConstruccion
      titulo="Detalle de Sesión"
      descripcion="Vista individual de sesión"
      funcionalidadesEsperadas={[
        'Información de la sesión',
        'Paciente asignado',
        'Hora y duración',
        'Notas de la sesión',
        'Unirse a videollamada',
        'Marcar como completada'
      ]}
    />
  )
}
