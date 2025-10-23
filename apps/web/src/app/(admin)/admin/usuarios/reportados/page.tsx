import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuarios Reportados | MentalFit',
  description: 'Gestión de reportes'
}

export default function PaginaUsuariosReportados() {
  return (
    <EnConstruccion
      titulo="Usuarios Reportados"
      descripcion="Gestión de reportes"
      funcionalidadesEsperadas={[
        'Lista de reportes activos',
        'Motivos de reporte',
        'Investigación de casos',
        'Acciones tomadas',
        'Historial de reportes',
        'Estadísticas'
      ]}
    />
  )
}
