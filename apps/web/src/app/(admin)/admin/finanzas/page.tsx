import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard Financiero | MentalFit',
  description: 'Vista general de finanzas'
}

export default function PaginaDashboardFinanciero() {
  return (
    <EnConstruccion
      titulo="Dashboard Financiero"
      descripcion="Vista general de finanzas"
      funcionalidadesEsperadas={[
        'Ingresos totales',
        'Comisiones pendientes',
        'Gráficos de tendencias',
        'Proyecciones',
        'KPIs financieros',
        'Exportar reportes'
      ]}
    />
  )
}
