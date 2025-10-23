import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guías y Tutoriales | MentalFit',
  description: 'Aprende a usar MentalFit'
}

export default function PaginaGuíasyTutoriales() {
  return (
    <EnConstruccion
      titulo="Guías y Tutoriales"
      descripcion="Aprende a usar MentalFit"
      funcionalidadesEsperadas={[
        'Guías interactivas',
        'Videos tutoriales',
        'Mejores prácticas',
        'Casos de uso',
        'Actualizaciones de plataforma',
        'Tips y recomendaciones'
      ]}
    />
  )
}
