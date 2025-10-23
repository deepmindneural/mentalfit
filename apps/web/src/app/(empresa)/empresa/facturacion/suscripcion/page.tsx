import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suscripción | MentalFit',
  description: 'Gestión del plan'
}

export default function PaginaSuscripción() {
  return (
    <EnConstruccion
      titulo="Suscripción"
      descripcion="Gestión del plan"
      funcionalidadesEsperadas={[
        'Plan contratado',
        'Características incluidas',
        'Empleados activos',
        'Uso actual',
        'Cambiar plan',
        'Cancelar suscripción'
      ]}
    />
  )
}
