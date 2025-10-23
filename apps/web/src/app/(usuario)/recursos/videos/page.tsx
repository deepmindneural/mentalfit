import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos | MentalFit',
  description: 'Contenido multimedia'
}

export default function PaginaVideos() {
  return (
    <EnConstruccion
      titulo="Videos"
      descripcion="Contenido multimedia"
      funcionalidadesEsperadas={[
        'Biblioteca de videos',
        'Categorías',
        'Buscar videos',
        'Videos destacados',
        'Guardar favoritos',
        'Playlist personalizada'
      ]}
    />
  )
}
