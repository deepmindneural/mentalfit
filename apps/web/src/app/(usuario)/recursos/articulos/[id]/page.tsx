import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artículo | MentalFit',
  description: 'Leer contenido'
}

export default function PaginaArticuloRecurso() {
  return (
    <EnConstruccion
      titulo="Artículo"
      descripcion="Leer contenido"
      funcionalidadesEsperadas={[
        'Contenido del artículo',
        'Autor y fecha',
        'Tiempo de lectura',
        'Artículos relacionados',
        'Guardar favorito',
        'Compartir'
      ]}
    />
  )
}
