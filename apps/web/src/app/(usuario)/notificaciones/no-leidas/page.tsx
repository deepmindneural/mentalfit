import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'No Leídas | MentalFit',
  description: 'Notificaciones pendientes'
}

export default function PaginaNoLeídas() {
  return (
    <EnConstruccion
      titulo="No Leídas"
      descripcion="Notificaciones pendientes"
      funcionalidadesEsperadas={[
        'Notificaciones sin leer',
        'Marcar como leída',
        'Acción rápida',
        'Eliminar',
        'Archivar',
        'Filtros'
      ]}
    />
  )
}
