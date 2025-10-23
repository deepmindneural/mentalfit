import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recursos Corporativos | MentalFit',
  description: 'Contenido para la organización'
}

export default function PaginaRecursosCorporativos() {
  return (
    <EnConstruccion
      titulo="Recursos Corporativos"
      descripcion="Contenido para la organización"
      funcionalidadesEsperadas={[
        'Guías de implementación',
        'Mejores prácticas',
        'Casos de éxito',
        'Webinars',
        'Materiales de comunicación',
        'Kit de lanzamiento'
      ]}
    />
  )
}
