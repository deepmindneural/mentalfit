import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics Corporativo | MentalFit',
  description: 'Análisis profundo de datos'
}

export default function PaginaAnalyticsCorporativo() {
  return (
    <EnConstruccion
      titulo="Analytics Corporativo"
      descripcion="Análisis profundo de datos"
      funcionalidadesEsperadas={[
        'Análisis de adopción',
        'Segmentación por equipos',
        'Predicciones de tendencias',
        'Análisis de impacto',
        'Correlaciones',
        'Insights automáticos'
      ]}
    />
  )
}
