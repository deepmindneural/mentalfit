import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moderación | MentalFit',
  description: 'Centro de moderación'
}

export default function PaginaModeración() {
  return (
    <EnConstruccion
      titulo="Moderación"
      descripcion="Centro de moderación"
      funcionalidadesEsperadas={[
        'Cola de moderación',
        'Contenido reportado',
        'Reglas de moderación',
        'Acciones automáticas',
        'Historial',
        'Estadísticas'
      ]}
    />
  )
}
