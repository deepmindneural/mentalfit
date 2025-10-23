import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparar Evaluaciones | MentalFit',
  description: 'Análisis comparativo'
}

export default function PaginaCompararEvaluaciones() {
  return (
    <EnConstruccion
      titulo="Comparar Evaluaciones"
      descripcion="Análisis comparativo"
      funcionalidadesEsperadas={[
        'Seleccionar evaluaciones',
        'Comparativa lado a lado',
        'Cambios significativos',
        'Progreso identificado',
        'Gráficos comparativos',
        'Exportar comparativa'
      ]}
    />
  )
}
