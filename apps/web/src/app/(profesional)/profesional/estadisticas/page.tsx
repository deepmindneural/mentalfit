import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estadísticas | MentalFit',
  description: 'Métricas de desempeño profesional'
}

export default function PaginaEstadísticas() {
  return (
    <EnConstruccion
      titulo="Estadísticas"
      descripcion="Métricas de desempeño profesional"
      funcionalidadesEsperadas={[
        'Sesiones completadas',
        'Horas facturadas',
        'Calificación promedio',
        'Pacientes activos',
        'Tendencias mensuales',
        'Comparativas con promedios'
      ]}
    />
  )
}
