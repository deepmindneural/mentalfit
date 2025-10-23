import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendario Corporativo | MentalFit',
  description: 'Eventos y planificación'
}

export default function PaginaCalendarioCorporativo() {
  return (
    <EnConstruccion
      titulo="Calendario Corporativo"
      descripcion="Eventos y planificación"
      funcionalidadesEsperadas={[
        'Calendario de eventos',
        'Sesiones grupales',
        'Webinars',
        'Mantenimientos programados',
        'Sincronizar con calendario',
        'Recordatorios'
      ]}
    />
  )
}
