import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resultados de Evaluaciones | MentalFit',
  description: 'Tus resultados'
}

export default function PaginaResultadosdeEvaluaciones() {
  return (
    <EnConstruccion
      titulo="Resultados de Evaluaciones"
      descripcion="Tus resultados"
      funcionalidadesEsperadas={[
        'Resultados recientes',
        'Interpretación',
        'Nivel de bienestar',
        'Recomendaciones',
        'Compartir con terapeuta',
        'Comparar con anteriores'
      ]}
    />
  )
}
