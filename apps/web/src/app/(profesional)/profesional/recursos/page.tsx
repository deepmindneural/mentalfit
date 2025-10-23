import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recursos Profesionales | MentalFit',
  description: 'Formación y materiales'
}

export default function PaginaRecursosProfesionales() {
  return (
    <EnConstruccion
      titulo="Recursos Profesionales"
      descripcion="Formación y materiales"
      funcionalidadesEsperadas={[
        'Artículos científicos',
        'Guías clínicas',
        'Casos clínicos',
        'Webinars',
        'Actualizaciones',
        'Biblioteca'
      ]}
    />
  )
}
