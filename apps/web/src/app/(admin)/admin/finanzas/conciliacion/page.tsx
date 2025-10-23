import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conciliación | MentalFit',
  description: 'Conciliación bancaria'
}

export default function PaginaConciliación() {
  return (
    <EnConstruccion
      titulo="Conciliación"
      descripcion="Conciliación bancaria"
      funcionalidadesEsperadas={[
        'Conciliación automática',
        'Diferencias encontradas',
        'Resolver discrepancias',
        'Historial de conciliaciones',
        'Exportar',
        'Estadísticas'
      ]}
    />
  )
}
