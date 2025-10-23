import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ingresos | MentalFit',
  description: 'Gestión de ingresos'
}

export default function PaginaIngresos() {
  return (
    <EnConstruccion
      titulo="Ingresos"
      descripcion="Gestión de ingresos"
      funcionalidadesEsperadas={[
        'Ingresos por fuente',
        'Ingresos mensuales',
        'Comparativas',
        'Segmentación',
        'Proyecciones',
        'Exportar datos'
      ]}
    />
  )
}
