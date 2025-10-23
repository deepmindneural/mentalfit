import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partners y Alianzas | MentalFit',
  description: 'Colaboradores estratégicos'
}

export default function PaginaPartnersyAlianzas() {
  return (
    <EnConstruccion
      titulo="Partners y Alianzas"
      descripcion="Colaboradores estratégicos"
      funcionalidadesEsperadas={[
        'Red de aliados corporativos',
        'Instituciones académicas',
        'Organizaciones de salud',
        'Programa de afiliados',
        'Casos de colaboración',
        'Formulario para ser partner'
      ]}
    />
  )
}
