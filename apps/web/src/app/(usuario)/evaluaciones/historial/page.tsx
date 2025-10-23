import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Evaluaciones | MentalFit',
  description: 'Seguimiento temporal'
}

export default function PaginaHistorialdeEvaluaciones() {
  return (
    <EnConstruccion
      titulo="Historial de Evaluaciones"
      descripcion="Seguimiento temporal"
      funcionalidadesEsperadas={[
        'Todas las evaluaciones',
        'Evolución temporal',
        'Comparativas',
        'Tendencias',
        'Gráficos históricos',
        'Exportar historial'
      ]}
    />
  )
}
