import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todas las Notificaciones | MentalFit',
  description: 'Historial completo'
}

export default function PaginaTodaslasNotificaciones() {
  return (
    <EnConstruccion
      titulo="Todas las Notificaciones"
      descripcion="Historial completo"
      funcionalidadesEsperadas={[
        'Lista completa',
        'Filtrar por tipo',
        'Filtrar por fecha',
        'Buscar',
        'Eliminar',
        'Exportar'
      ]}
    />
  )
}
