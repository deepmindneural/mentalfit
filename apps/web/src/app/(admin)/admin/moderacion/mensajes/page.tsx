import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mensajes Reportados | MentalFit',
  description: 'Moderación de chat'
}

export default function PaginaMensajesReportados() {
  return (
    <EnConstruccion
      titulo="Mensajes Reportados"
      descripcion="Moderación de chat"
      funcionalidadesEsperadas={[
        'Mensajes flagged',
        'Contexto de conversación',
        'Acciones disponibles',
        'Notificar usuarios',
        'Historial de moderación',
        'Filtros automáticos'
      ]}
    />
  )
}
