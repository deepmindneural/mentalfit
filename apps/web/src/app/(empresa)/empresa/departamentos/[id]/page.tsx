import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle Departamento | MentalFit',
  description: 'Vista de área específica'
}

export default function PaginaDetalleDepartamento() {
  return (
    <EnConstruccion
      titulo="Detalle Departamento"
      descripcion="Vista de área específica"
      funcionalidadesEsperadas={[
        'Información del departamento',
        'Empleados asignados',
        'Métricas de uso',
        'Tendencias de bienestar',
        'Comparativas',
        'Exportar datos'
      ]}
    />
  )
}
