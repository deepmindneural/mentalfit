import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vacaciones y Ausencias | MentalFit',
  description: 'Bloquear períodos'
}

export default function PaginaVacacionesyAusencias() {
  return (
    <EnConstruccion
      titulo="Vacaciones y Ausencias"
      descripcion="Bloquear períodos"
      funcionalidadesEsperadas={[
        'Programar vacaciones',
        'Días festivos',
        'Ausencias programadas',
        'Notificación a pacientes',
        'Historial de ausencias',
        'Confirmar bloqueos'
      ]}
    />
  )
}
