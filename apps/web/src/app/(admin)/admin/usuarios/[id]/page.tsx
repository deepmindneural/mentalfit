import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle Usuario | MentalFit',
  description: 'Vista completa de usuario'
}

export default function PaginaDetalleUsuario() {
  return (
    <EnConstruccion
      titulo="Detalle Usuario"
      descripcion="Vista completa de usuario"
      funcionalidadesEsperadas={[
        'Perfil de usuario',
        'Historial de sesiones',
        'Evaluaciones completadas',
        'Uso de recursos',
        'Plan actual',
        'Timeline de actividad'
      ]}
    />
  )
}
