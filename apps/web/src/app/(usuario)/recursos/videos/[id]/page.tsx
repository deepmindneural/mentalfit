import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video | MentalFit',
  description: 'Reproducir contenido'
}

export default function PaginaVideoRecurso() {
  return (
    <EnConstruccion
      titulo="Video"
      descripcion="Reproducir contenido"
      funcionalidadesEsperadas={[
        'Reproductor de video',
        'Descripción',
        'Transcripción',
        'Videos relacionados',
        'Guardar favorito',
        'Compartir'
      ]}
    />
  )
}
