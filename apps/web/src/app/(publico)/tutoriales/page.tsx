import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tutoriales | MentalFit',
  description: 'Aprende paso a paso'
}

export default function PaginaTutoriales() {
  return (
    <EnConstruccion
      titulo="Tutoriales"
      descripcion="Aprende paso a paso"
      funcionalidadesEsperadas={[
        'Tutorial de registro',
        'Tutorial de primera sesión',
        'Tutorial de evaluaciones',
        'Tutorial de recursos',
        'Tutorial de configuración',
        'Tutorial de videollamadas'
      ]}
    />
  )
}
