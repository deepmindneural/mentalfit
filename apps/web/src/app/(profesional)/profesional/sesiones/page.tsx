import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Sesiones | MentalFit',
  description: 'Vista general de sesiones'
}

export default function PaginaGestióndeSesiones() {
  return (
    <EnConstruccion
      titulo="Gestión de Sesiones"
      descripcion="Vista general de sesiones"
      funcionalidadesEsperadas={[
        'Próximas sesiones',
        'Sesiones pasadas',
        'Sesiones canceladas',
        'Búsqueda de sesiones',
        'Filtros avanzados',
        'Exportar lista'
      ]}
    />
  )
}
