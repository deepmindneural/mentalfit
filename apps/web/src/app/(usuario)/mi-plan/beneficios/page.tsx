import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beneficios | MentalFit',
  description: 'Detalles de tu plan'
}

export default function PaginaBeneficios() {
  return (
    <EnConstruccion
      titulo="Beneficios"
      descripcion="Detalles de tu plan"
      funcionalidadesEsperadas={[
        'Sesiones incluidas',
        'Recursos disponibles',
        'Evaluaciones incluidas',
        'Servicios adicionales',
        'Términos y condiciones',
        'Contacto con soporte'
      ]}
    />
  )
}
