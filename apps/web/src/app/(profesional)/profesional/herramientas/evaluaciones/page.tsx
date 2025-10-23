import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evaluaciones | MentalFit',
  description: 'Tests y cuestionarios'
}

export default function PaginaEvaluaciones() {
  return (
    <EnConstruccion
      titulo="Evaluaciones"
      descripcion="Tests y cuestionarios"
      funcionalidadesEsperadas={[
        'Catálogo de evaluaciones',
        'Aplicar evaluación',
        'Interpretación de resultados',
        'Normativas',
        'Favoritos',
        'Búsqueda'
      ]}
    />
  )
}
