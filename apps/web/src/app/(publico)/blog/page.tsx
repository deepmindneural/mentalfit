import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | MentalFit',
  description: 'Artículos sobre salud mental y bienestar'
}

export default function PaginaBlog() {
  return (
    <EnConstruccion
      titulo="Blog"
      descripcion="Artículos sobre salud mental y bienestar"
      funcionalidadesEsperadas={[
        'Lista de artículos recientes',
        'Categorías y tags',
        'Búsqueda de contenido',
        'Artículos destacados',
        'Autores y colaboradores',
        'Newsletter de suscripción'
      ]}
    />
  )
}
