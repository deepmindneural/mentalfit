import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Límite Excedido | MentalFit',
  description: 'Has alcanzado el límite de tu plan'
}

export default function PaginaLímiteExcedido() {
  return (
    <EnConstruccion
      titulo="Límite Excedido"
      descripcion="Has alcanzado el límite de tu plan"
      funcionalidadesEsperadas={[
        'Tipo de límite alcanzado',
        'Uso actual vs límite',
        'Upgrade de plan',
        'Esperar renovación',
        'Comprar sesiones adicionales',
        'Contactar soporte'
      ]}
    />
  )
}
