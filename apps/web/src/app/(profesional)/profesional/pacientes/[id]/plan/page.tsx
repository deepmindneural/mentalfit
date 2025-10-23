import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan de Tratamiento | MentalFit',
  description: 'Objetivos y seguimiento'
}

export default function PaginaPlanTratamiento() {
  return (
    <EnConstruccion
      titulo="Plan de Tratamiento"
      descripcion="Objetivos y seguimiento"
      funcionalidadesEsperadas={[
        'Objetivos terapéuticos',
        'Estrategias de intervención',
        'Progreso del paciente',
        'Ajustes al plan',
        'Hitos alcanzados',
        'Compartir con paciente'
      ]}
    />
  )
}
