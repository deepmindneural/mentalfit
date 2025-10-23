import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Métricas Departamento | MentalFit',
  description: 'Análisis por área'
}

export default function PaginaMetricasDepartamento() {
  return (
    <EnConstruccion
      titulo="Métricas Departamento"
      descripcion="Análisis por área"
      funcionalidadesEsperadas={[
        'KPIs del departamento',
        'Adopción de la plataforma',
        'Indicadores de bienestar',
        'Comparativas interdepartamentales',
        'Tendencias temporales',
        'Recomendaciones'
      ]}
    />
  )
}
