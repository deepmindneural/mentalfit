import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centro de Notificaciones | MentalFit',
  description: 'Todas tus notificaciones'
}

export default function PaginaCentrodeNotificaciones() {
  return (
    <EnConstruccion
      titulo="Centro de Notificaciones"
      descripcion="Todas tus notificaciones"
      funcionalidadesEsperadas={[
        'Notificaciones recientes',
        'No leídas',
        'Leídas',
        'Filtros',
        'Marcar todas como leídas',
        'Configurar'
      ]}
    />
  )
}
