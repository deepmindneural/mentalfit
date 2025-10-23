import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics Avanzado | MentalFit',
  description: 'Análisis profundo de datos'
}

export default function PaginaAnalyticsAvanzado() {
  return (
    <EnConstruccion
      titulo="Analytics Avanzado"
      descripcion="Análisis profundo de datos"
      funcionalidadesEsperadas={[
        'Análisis de comportamiento',
        'Funnel de conversión',
        'Retención de usuarios',
        'Segmentación avanzada',
        'Predicciones y tendencias',
        'Dashboards personalizables'
      ]}
    />
  )
}
