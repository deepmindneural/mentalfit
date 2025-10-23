import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suspender Empresa | MentalFit',
  description: 'Suspensión temporal o permanente'
}

export default function PaginaSuspensionEmpresa() {
  return (
    <EnConstruccion
      titulo="Suspender Empresa"
      descripcion="Suspensión temporal o permanente"
      funcionalidadesEsperadas={[
        'Motivos de suspensión',
        'Período de suspensión',
        'Notificaciones automáticas',
        'Impacto en empleados',
        'Reactivación',
        'Historial de suspensiones'
      ]}
    />
  )
}
