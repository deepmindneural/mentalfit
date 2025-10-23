import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mensajes | MentalFit',
  description: 'Comunicación con pacientes'
}

export default function PaginaMensajes() {
  return (
    <EnConstruccion
      titulo="Mensajes"
      descripcion="Comunicación con pacientes"
      funcionalidadesEsperadas={[
        'Bandeja de entrada',
        'Conversaciones activas',
        'Nuevo mensaje',
        'Búsqueda de conversaciones',
        'Archivar',
        'Configuración de mensajería'
      ]}
    />
  )
}
