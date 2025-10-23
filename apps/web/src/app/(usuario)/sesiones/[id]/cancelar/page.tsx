import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cancelar Sesión | MentalFit',
  description: 'Cancelación de cita'
}

export default function PaginaCancelarSesion() {
  return (
    <EnConstruccion
      titulo="Cancelar Sesión"
      descripcion="Cancelación de cita"
      funcionalidadesEsperadas={[
        'Motivo de cancelación',
        'Política de cancelación',
        'Reembolso aplicable',
        'Confirmar cancelación',
        'Reprogramar alternativa',
        'Notificación al terapeuta'
      ]}
    />
  )
}
