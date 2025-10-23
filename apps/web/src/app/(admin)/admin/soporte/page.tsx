import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tickets de Soporte | MentalFit',
  description: 'Gestión de soporte'
}

export default function PaginaTicketsdeSoporte() {
  return (
    <EnConstruccion
      titulo="Tickets de Soporte"
      descripcion="Gestión de soporte"
      funcionalidadesEsperadas={[
        'Cola de tickets',
        'Priorización',
        'Asignación',
        'Responder tickets',
        'Base de conocimiento',
        'Estadísticas SLA'
      ]}
    />
  )
}
