import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Progreso | MentalFit',
  description: 'Seguimiento de evolución personal'
}

export default function PaginaMiProgreso() {
  return (
    <EnConstruccion
      titulo="Mi Progreso"
      descripcion="Seguimiento de evolución personal"
      funcionalidadesEsperadas={[
        'Gráficos de progreso',
        'Evaluaciones completadas',
        'Objetivos alcanzados',
        'Horas de terapia',
        'Recursos utilizados',
        'Timeline de hitos'
      ]}
    />
  )
}
