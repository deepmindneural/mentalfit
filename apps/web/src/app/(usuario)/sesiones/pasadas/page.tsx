import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sesiones Pasadas | MentalFit',
  description: 'Historial de sesiones'
}

export default function PaginaSesionesPasadas() {
  return (
    <EnConstruccion
      titulo="Sesiones Pasadas"
      descripcion="Historial de sesiones"
      funcionalidadesEsperadas={[
        'Lista de sesiones completadas',
        'Profesional atendido',
        'Fecha y duración',
        'Notas compartidas',
        'Calificar sesión',
        'Reservar nuevamente'
      ]}
    />
  )
}
