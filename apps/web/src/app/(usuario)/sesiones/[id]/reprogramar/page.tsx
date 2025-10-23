import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reprogramar Sesión | MentalFit',
  description: 'Cambiar fecha/hora'
}

export default function PaginaReprogramarSesion() {
  return (
    <EnConstruccion
      titulo="Reprogramar Sesión"
      descripcion="Cambiar fecha/hora"
      funcionalidadesEsperadas={[
        'Nueva fecha y hora',
        'Disponibilidad del terapeuta',
        'Política de reprogramación',
        'Confirmar cambio',
        'Notificaciones',
        'Confirmación'
      ]}
    />
  )
}
