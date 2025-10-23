import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planes y Precios | MentalFit',
  description: 'Gestión de planes'
}

export default function PaginaPlanesyPrecios() {
  return (
    <EnConstruccion
      titulo="Planes y Precios"
      descripcion="Gestión de planes"
      funcionalidadesEsperadas={[
        'Lista de planes',
        'Crear/editar plan',
        'Características incluidas',
        'Precios por región',
        'Promociones',
        'Migraciones de plan'
      ]}
    />
  )
}
