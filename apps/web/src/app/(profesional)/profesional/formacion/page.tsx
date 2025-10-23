import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formación Continua | MentalFit',
  description: 'Desarrollo profesional'
}

export default function PaginaFormaciónContinua() {
  return (
    <EnConstruccion
      titulo="Formación Continua"
      descripcion="Desarrollo profesional"
      funcionalidadesEsperadas={[
        'Cursos disponibles',
        'Webinars próximos',
        'Certificaciones',
        'Créditos de formación',
        'Mis cursos completados',
        'Inscripciones'
      ]}
    />
  )
}
