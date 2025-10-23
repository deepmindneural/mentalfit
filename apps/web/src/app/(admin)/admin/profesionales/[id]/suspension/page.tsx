import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suspender Profesional | MentalFit',
  description: 'Suspensión de terapeuta'
}

export default function PaginaSuspensionProfesional() {
  return (
    <EnConstruccion
      titulo="Suspender Profesional"
      descripcion="Suspensión de terapeuta"
      funcionalidadesEsperadas={[
        'Motivos de suspensión',
        'Período de suspensión',
        'Impacto en pacientes activos',
        'Notificaciones',
        'Reactivación',
        'Historial de suspensiones'
      ]}
    />
  )
}
