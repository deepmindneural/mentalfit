import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mensajes | MentalFit',
  description: 'Centro de comunicación'
}

export default function PaginaMensajes() {
  return (
    <EnConstruccion
      titulo="Mensajes"
      descripcion="Centro de comunicación"
      funcionalidadesEsperadas={[
        'Conversaciones activas',
        'Mensajes no leídos',
        'Buscar conversaciones',
        'Nuevo mensaje',
        'Archivar',
        'Configuración'
      ]}
    />
  )
}
