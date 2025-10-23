import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración de Notificaciones | MentalFit',
  description: 'Preferencias'
}

export default function PaginaConfiguracióndeNotificaciones() {
  return (
    <EnConstruccion
      titulo="Configuración de Notificaciones"
      descripcion="Preferencias"
      funcionalidadesEsperadas={[
        'Tipos de notificaciones',
        'Canales (email, push, SMS)',
        'Frecuencia',
        'Horarios',
        'No molestar',
        'Guardar preferencias'
      ]}
    />
  )
}
