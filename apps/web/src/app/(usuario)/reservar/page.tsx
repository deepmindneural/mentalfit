import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nueva Reserva | MentalFit',
  description: 'Agendar sesión terapéutica'
}

export default function PaginaNuevaReserva() {
  return (
    <EnConstruccion
      titulo="Nueva Reserva"
      descripcion="Agendar sesión terapéutica"
      funcionalidadesEsperadas={[
        'Seleccionar profesional',
        'Elegir fecha y hora',
        'Tipo de sesión',
        'Motivo de consulta',
        'Método de pago',
        'Confirmar reserva'
      ]}
    />
  )
}
