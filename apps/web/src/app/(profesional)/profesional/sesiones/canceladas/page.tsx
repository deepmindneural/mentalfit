import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sesiones Canceladas | MentalFit',
  description: 'Gestión de cancelaciones'
}

export default function PaginaSesionesCanceladas() {
  return (
    <EnConstruccion
      titulo="Sesiones Canceladas"
      descripcion="Gestión de cancelaciones"
      funcionalidadesEsperadas={[
        'Lista de cancelaciones',
        'Motivo de cancelación',
        'Política de cancelación',
        'Reprogramar',
        'Estadísticas',
        'Filtros'
      ]}
    />
  )
}
