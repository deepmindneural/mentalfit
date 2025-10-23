import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Métricas Globales | MentalFit',
  description: 'Dashboard de métricas del sistema'
}

export default function PaginaMétricasGlobales() {
  return (
    <EnConstruccion
      titulo="Métricas Globales"
      descripcion="Dashboard de métricas del sistema"
      funcionalidadesEsperadas={[
        'KPIs principales del sistema',
        'Usuarios activos y crecimiento',
        'Sesiones completadas',
        'Ingresos totales',
        'Gráficos de tendencias',
        'Exportar reportes'
      ]}
    />
  )
}
