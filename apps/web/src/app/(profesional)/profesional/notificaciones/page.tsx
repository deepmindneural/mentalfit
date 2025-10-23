import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notificaciones | MentalFit',
  description: 'Alertas y recordatorios'
}

export default function PaginaNotificaciones() {
  return (
    <EnConstruccion
      titulo="Notificaciones"
      descripcion="Alertas y recordatorios"
      funcionalidadesEsperadas={[
        'Notificaciones recientes',
        'Marcar como leídas',
        'Filtros por tipo',
        'Configurar preferencias',
        'Historial',
        'Eliminar todas'
      ]}
    />
  )
}
