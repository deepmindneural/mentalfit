import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración de Notificaciones | MentalFit',
  description: 'Preferencias de alertas'
}

export default function PaginaConfiguracióndeNotificaciones() {
  return (
    <EnConstruccion
      titulo="Configuración de Notificaciones"
      descripcion="Preferencias de alertas"
      funcionalidadesEsperadas={[
        'Email',
        'Push',
        'SMS',
        'Tipos de notificaciones',
        'Frecuencia',
        'Horarios de envío'
      ]}
    />
  )
}
