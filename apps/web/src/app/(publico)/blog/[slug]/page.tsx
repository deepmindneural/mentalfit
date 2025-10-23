import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artículo | MentalFit',
  description: 'Lee nuestros artículos sobre salud mental'
}

export default function PaginaArticuloBlog() {
  return (
    <EnConstruccion
      titulo="Artículo"
      descripcion="Lee nuestros artículos sobre salud mental"
      funcionalidadesEsperadas={[
        'Contenido enriquecido con multimedia',
        'Artículos relacionados',
        'Compartir en redes sociales',
        'Comentarios y discusión',
        'Tiempo de lectura estimado',
        'Autor y fecha de publicación'
      ]}
    />
  )
}
