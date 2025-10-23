import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mis Evaluaciones | MentalFit',
  description: 'Tests de bienestar mental'
}

export default function PaginaMisEvaluaciones() {
  return (
    <EnConstruccion
      titulo="Mis Evaluaciones"
      descripcion="Tests de bienestar mental"
      funcionalidadesEsperadas={[
        'Evaluaciones disponibles',
        'Evaluaciones completadas',
        'Resultados históricos',
        'Recomendaciones',
        'Iniciar evaluación',
        'Compartir con terapeuta'
      ]}
    />
  )
}
