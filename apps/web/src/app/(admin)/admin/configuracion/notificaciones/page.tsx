import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notificaciones | MentalFit',
  description: 'Configuración de alertas'
}

export default function PaginaNotificaciones() {
  return (
    <EnConstruccion
      titulo="Notificaciones"
      descripcion="Configuración de alertas"
      funcionalidadesEsperadas={[
        'Templates de notificaciones',
        'Canales (email, push, SMS)',
        'Triggers y eventos',
        'Preferencias por defecto',
        'Test de envío',
        'Logs de notificaciones'
      ]}
    />
  )
}
