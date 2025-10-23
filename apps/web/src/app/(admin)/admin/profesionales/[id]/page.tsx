import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle Profesional | MentalFit',
  description: 'Vista completa de terapeuta'
}

export default function PaginaDetalleProfesional() {
  return (
    <EnConstruccion
      titulo="Detalle Profesional"
      descripcion="Vista completa de terapeuta"
      funcionalidadesEsperadas={[
        'Perfil profesional completo',
        'Documentos y certificaciones',
        'Historial de sesiones',
        'Calificaciones recibidas',
        'Ingresos generados',
        'Timeline de actividad'
      ]}
    />
  )
}
