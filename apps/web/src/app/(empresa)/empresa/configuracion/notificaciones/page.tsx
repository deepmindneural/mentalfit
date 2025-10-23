import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notificaciones | MentalFit',
  description: 'Configurar alertas corporativas'
}

export default function PaginaNotificaciones() {
  return (
    <EnConstruccion
      titulo="Notificaciones"
      descripcion="Configurar alertas corporativas"
      funcionalidadesEsperadas={[
        'Notificaciones a administradores',
        'Reportes automáticos',
        'Alertas de uso',
        'Frecuencia de envíos',
        'Destinatarios',
        'Preferencias de canal'
      ]}
    />
  )
}
