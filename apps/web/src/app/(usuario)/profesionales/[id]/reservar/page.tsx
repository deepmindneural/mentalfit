import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reservar Sesión | MentalFit',
  description: 'Agendar cita con terapeuta'
}

export default function PaginaReservarSesion() {
  return (
    <EnConstruccion
      titulo="Reservar Sesión"
      descripcion="Agendar cita con terapeuta"
      funcionalidadesEsperadas={[
        'Calendario de disponibilidad',
        'Seleccionar fecha y hora',
        'Tipo de sesión',
        'Motivo de consulta',
        'Confirmar reserva',
        'Recibir confirmación'
      ]}
    />
  )
}
