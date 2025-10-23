import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle Ticket | MentalFit',
  description: 'Vista de ticket individual'
}

export default function PaginaDetalleTicket() {
  return (
    <EnConstruccion
      titulo="Detalle Ticket"
      descripcion="Vista de ticket individual"
      funcionalidadesEsperadas={[
        'Información del ticket',
        'Historial de conversación',
        'Asignación y prioridad',
        'Adjuntos',
        'Acciones rápidas',
        'Cerrar ticket'
      ]}
    />
  )
}
