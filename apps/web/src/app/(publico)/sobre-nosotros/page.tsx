import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | MentalFit',
  description: 'Conoce nuestra misión de democratizar el acceso a la salud mental'
}

export default function PaginaSobreNosotros() {
  return (
    <EnConstruccion
      titulo="Sobre Nosotros"
      descripcion="Conoce la historia, misión y valores de MentalFit"
      funcionalidadesEsperadas={[
        'Historia y origen de MentalFit',
        'Misión, visión y valores corporativos',
        'Equipo fundador y liderazgo',
        'Certificaciones y reconocimientos',
        'Impacto social y estadísticas',
        'Cronología de hitos importantes'
      ]}
    />
  )
}
