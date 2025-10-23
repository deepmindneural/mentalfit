import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sala de Prensa | MentalFit',
  description: 'Noticias y recursos para medios'
}

export default function PaginaSaladePrensa() {
  return (
    <EnConstruccion
      titulo="Sala de Prensa"
      descripcion="Noticias y recursos para medios"
      funcionalidadesEsperadas={[
        'Comunicados de prensa',
        'Kit de prensa descargable',
        'Logos y assets de marca',
        'Contacto para medios',
        'Apariciones en medios',
        'Datos y estadísticas actualizadas'
      ]}
    />
  )
}
