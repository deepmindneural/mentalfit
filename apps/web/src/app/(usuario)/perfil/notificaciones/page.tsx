import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notificaciones | MentalFit',
  description: 'Preferencias de alertas'
}

export default function PaginaNotificaciones() {
  return (
    <EnConstruccion
      titulo="Notificaciones"
      descripcion="Preferencias de alertas"
      funcionalidadesEsperadas={[
        'Notificaciones por email',
        'Notificaciones push',
        'Notificaciones SMS',
        'Tipos de notificaciones',
        'Frecuencia',
        'Guardar configuración'
      ]}
    />
  )
}
