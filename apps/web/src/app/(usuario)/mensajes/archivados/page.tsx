import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mensajes Archivados | MentalFit',
  description: 'Conversaciones archivadas'
}

export default function PaginaMensajesArchivados() {
  return (
    <EnConstruccion
      titulo="Mensajes Archivados"
      descripcion="Conversaciones archivadas"
      funcionalidadesEsperadas={[
        'Lista de archivados',
        'Buscar',
        'Restaurar',
        'Eliminar permanentemente',
        'Filtros',
        'Exportar'
      ]}
    />
  )
}
