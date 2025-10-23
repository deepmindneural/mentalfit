import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mis Ingresos | MentalFit',
  description: 'Dashboard financiero'
}

export default function PaginaMisIngresos() {
  return (
    <EnConstruccion
      titulo="Mis Ingresos"
      descripcion="Dashboard financiero"
      funcionalidadesEsperadas={[
        'Ingresos totales',
        'Ingresos del mes',
        'Comisiones de plataforma',
        'Ingresos netos',
        'Gráficos de tendencias',
        'Proyecciones'
      ]}
    />
  )
}
