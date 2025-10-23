import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anuncios | MentalFit',
  description: 'Comunicados de la plataforma'
}

export default function PaginaAnuncios() {
  return (
    <EnConstruccion
      titulo="Anuncios"
      descripcion="Comunicados de la plataforma"
      funcionalidadesEsperadas={[
        'Anuncios recientes',
        'Actualizaciones de plataforma',
        'Nuevas funcionalidades',
        'Mantenimientos programados',
        'Cambios en políticas',
        'Archivar anuncios'
      ]}
    />
  )
}
