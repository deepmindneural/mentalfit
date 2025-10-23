import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle Empleado | MentalFit',
  description: 'Vista individual de usuario'
}

export default function PaginaDetalleEmpleado() {
  return (
    <EnConstruccion
      titulo="Detalle Empleado"
      descripcion="Vista individual de usuario"
      funcionalidadesEsperadas={[
        'Perfil del empleado',
        'Uso de la plataforma',
        'Sesiones asistidas',
        'Evaluaciones completadas',
        'Departamento y equipo',
        'Timeline de actividad'
      ]}
    />
  )
}
