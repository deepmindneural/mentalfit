import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log de Actividad | MentalFit',
  description: 'Registro de acciones del sistema'
}

export default function PaginaLogdeActividad() {
  return (
    <EnConstruccion
      titulo="Log de Actividad"
      descripcion="Registro de acciones del sistema"
      funcionalidadesEsperadas={[
        'Log de auditoría completo',
        'Filtros por usuario y acción',
        'Eventos críticos destacados',
        'Búsqueda avanzada',
        'Exportar logs',
        'Retención de logs'
      ]}
    />
  )
}
