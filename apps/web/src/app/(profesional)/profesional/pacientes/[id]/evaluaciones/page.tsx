import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evaluaciones | MentalFit',
  description: 'Tests aplicados al paciente'
}

export default function PaginaEvaluacionesPaciente() {
  return (
    <EnConstruccion
      titulo="Evaluaciones"
      descripcion="Tests aplicados al paciente"
      funcionalidadesEsperadas={[
        'Evaluaciones completadas',
        'Resultados y scoring',
        'Interpretación clínica',
        'Comparativas temporales',
        'Aplicar nueva evaluación',
        'Exportar resultados'
      ]}
    />
  )
}
