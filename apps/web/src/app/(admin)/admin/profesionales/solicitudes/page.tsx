import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solicitudes | MentalFit',
  description: 'Nuevos profesionales pendientes'
}

export default function PaginaSolicitudes() {
  return (
    <EnConstruccion
      titulo="Solicitudes"
      descripcion="Nuevos profesionales pendientes"
      funcionalidadesEsperadas={[
        'Solicitudes pendientes de revisión',
        'Documentación adjunta',
        'Verificación de credenciales',
        'Aprobar o rechazar',
        'Historial de solicitudes',
        'Estadísticas de aprobación'
      ]}
    />
  )
}
