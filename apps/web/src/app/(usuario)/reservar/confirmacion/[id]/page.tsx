import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confirmación de Reserva | MentalFit',
  description: 'Detalles de cita agendada'
}

export default function PaginaConfirmacionReserva() {
  return (
    <EnConstruccion
      titulo="Confirmación de Reserva"
      descripcion="Detalles de cita agendada"
      funcionalidadesEsperadas={[
        'Información de la sesión',
        'Profesional asignado',
        'Fecha y hora confirmada',
        'Agregar a calendario',
        'Instrucciones previas',
        'Opciones de modificación'
      ]}
    />
  )
}
