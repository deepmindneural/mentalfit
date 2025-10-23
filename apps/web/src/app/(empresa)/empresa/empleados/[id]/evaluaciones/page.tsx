import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evaluaciones Empleado | MentalFit',
  description: 'Tests completados (agregados)'
}

export default function PaginaEvaluacionesEmpleado() {
  return (
    <EnConstruccion
      titulo="Evaluaciones Empleado"
      descripcion="Tests completados (agregados)"
      funcionalidadesEsperadas={[
        'Evaluaciones completadas',
        'Tendencias de bienestar',
        'Datos anonimizados',
        'Comparativas con promedios',
        'Recomendaciones',
        'Privacidad protegida'
      ]}
    />
  )
}
