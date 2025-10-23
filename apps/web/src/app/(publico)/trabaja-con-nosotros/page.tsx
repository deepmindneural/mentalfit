import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trabaja con Nosotros | MentalFit',
  description: 'Únete al equipo de MentalFit'
}

export default function PaginaTrabajaconNosotros() {
  return (
    <EnConstruccion
      titulo="Trabaja con Nosotros"
      descripcion="Únete al equipo de MentalFit"
      funcionalidadesEsperadas={[
        'Vacantes abiertas por área',
        'Cultura y valores empresariales',
        'Beneficios para colaboradores',
        'Proceso de selección',
        'Testimonios del equipo',
        'Formulario de postulación'
      ]}
    />
  )
}
