import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reseñas Reportadas | MentalFit',
  description: 'Moderación de reviews'
}

export default function PaginaReseñasReportadas() {
  return (
    <EnConstruccion
      titulo="Reseñas Reportadas"
      descripcion="Moderación de reviews"
      funcionalidadesEsperadas={[
        'Reseñas reportadas',
        'Validar autenticidad',
        'Aprobar/rechazar',
        'Contactar usuario',
        'Historial',
        'Estadísticas'
      ]}
    />
  )
}
