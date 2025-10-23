import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cita Confirmada | MentalFit',
  description: 'Tu sesión ha sido agendada'
}

export default function PaginaCitaConfirmada() {
  return (
    <EnConstruccion
      titulo="Cita Confirmada"
      descripcion="Tu sesión ha sido agendada"
      funcionalidadesEsperadas={[
        'Confirmación de reserva',
        'Detalles de la sesión',
        'Profesional asignado',
        'Agregar a calendario',
        'Preparación para sesión',
        'Modificar cita'
      ]}
    />
  )
}
