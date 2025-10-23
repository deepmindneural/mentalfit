import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Agenda | MentalFit',
  description: 'Calendario de sesiones profesionales'
}

export default function PaginaMiAgenda() {
  return (
    <EnConstruccion
      titulo="Mi Agenda"
      descripcion="Calendario de sesiones profesionales"
      funcionalidadesEsperadas={[
        'Vista de calendario',
        'Sesiones próximas',
        'Disponibilidad configurada',
        'Bloqueos de tiempo',
        'Sincronizar con Google Calendar',
        'Vista diaria, semanal, mensual'
      ]}
    />
  )
}
