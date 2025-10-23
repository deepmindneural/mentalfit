import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artículos | MentalFit',
  description: 'Gestión de blog'
}

export default function PaginaArtículos() {
  return (
    <EnConstruccion
      titulo="Artículos"
      descripcion="Gestión de blog"
      funcionalidadesEsperadas={[
        'Lista de artículos',
        'Borradores',
        'Programar publicación',
        'Categorías y tags',
        'SEO',
        'Estadísticas de lectura'
      ]}
    />
  )
}
