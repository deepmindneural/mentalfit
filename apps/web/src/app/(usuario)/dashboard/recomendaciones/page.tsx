import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recomendaciones | MentalFit',
  description: 'Contenido personalizado'
}

export default function PaginaRecomendaciones() {
  return (
    <EnConstruccion
      titulo="Recomendaciones"
      descripcion="Contenido personalizado"
      funcionalidadesEsperadas={[
        'Profesionales recomendados',
        'Recursos sugeridos',
        'Artículos relevantes',
        'Ejercicios personalizados',
        'Evaluaciones pendientes',
        'Próximos pasos'
      ]}
    />
  )
}
