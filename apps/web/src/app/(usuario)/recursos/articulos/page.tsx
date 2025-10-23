import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artículos | MentalFit',
  description: 'Contenido educativo'
}

export default function PaginaArtículos() {
  return (
    <EnConstruccion
      titulo="Artículos"
      descripcion="Contenido educativo"
      funcionalidadesEsperadas={[
        'Lista de artículos',
        'Categorías',
        'Buscar artículos',
        'Artículos destacados',
        'Guardar favoritos',
        'Compartir'
      ]}
    />
  )
}
