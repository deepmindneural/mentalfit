import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uso del Plan | MentalFit',
  description: 'Seguimiento de consumo'
}

export default function PaginaUsodelPlan() {
  return (
    <EnConstruccion
      titulo="Uso del Plan"
      descripcion="Seguimiento de consumo"
      funcionalidadesEsperadas={[
        'Sesiones utilizadas',
        'Sesiones disponibles',
        'Recursos consumidos',
        'Gráficos de uso',
        'Proyección de consumo',
        'Historial mensual'
      ]}
    />
  )
}
