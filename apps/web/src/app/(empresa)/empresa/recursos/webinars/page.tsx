import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webinars | MentalFit',
  description: 'Formación online'
}

export default function PaginaWebinars() {
  return (
    <EnConstruccion
      titulo="Webinars"
      descripcion="Formación online"
      funcionalidadesEsperadas={[
        'Próximos webinars',
        'Grabaciones disponibles',
        'Registrarse',
        'Materiales complementarios',
        'Certificados',
        'Calendario de formación'
      ]}
    />
  )
}
