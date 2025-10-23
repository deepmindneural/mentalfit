import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mensajes | MentalFit',
  description: 'Bandeja de mensajes'
}

export default function PaginaMensajes() {
  return (
    <EnConstruccion
      titulo="Mensajes"
      descripcion="Bandeja de mensajes"
      funcionalidadesEsperadas={[
        'Conversaciones recientes',
        'Mensajes no leídos',
        'Buscar',
        'Nuevo mensaje',
        'Archivar',
        'Configuración'
      ]}
    />
  )
}
