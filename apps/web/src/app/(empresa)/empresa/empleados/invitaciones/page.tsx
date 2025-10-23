import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invitaciones | MentalFit',
  description: 'Gestión de invitaciones pendientes'
}

export default function PaginaInvitaciones() {
  return (
    <EnConstruccion
      titulo="Invitaciones"
      descripcion="Gestión de invitaciones pendientes"
      funcionalidadesEsperadas={[
        'Invitaciones enviadas',
        'Estado de cada invitación',
        'Reenviar invitaciones',
        'Cancelar invitaciones',
        'Estadísticas de conversión',
        'Invitaciones expiradas'
      ]}
    />
  )
}
