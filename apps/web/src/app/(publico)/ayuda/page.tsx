import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centro de Ayuda | MentalFit',
  description: 'Encuentra respuestas a tus preguntas'
}

export default function PaginaCentrodeAyuda() {
  return (
    <EnConstruccion
      titulo="Centro de Ayuda"
      descripcion="Encuentra respuestas a tus preguntas"
      funcionalidadesEsperadas={[
        'Búsqueda de artículos de ayuda',
        'Categorías organizadas',
        'Artículos más visitados',
        'Guías paso a paso',
        'Videos tutoriales',
        'Contacto con soporte'
      ]}
    />
  )
}
