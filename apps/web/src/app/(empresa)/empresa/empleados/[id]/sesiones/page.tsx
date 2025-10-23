import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sesiones Empleado | MentalFit',
  description: 'Historial de sesiones'
}

export default function PaginaSesionesEmpleado() {
  return (
    <EnConstruccion
      titulo="Sesiones Empleado"
      descripcion="Historial de sesiones"
      funcionalidadesEsperadas={[
        'Lista de sesiones',
        'Estado de sesiones',
        'Uso de beneficios',
        'Próximas sesiones',
        'Estadísticas agregadas',
        'Privacidad protegida (no se muestran detalles clínicos)'
      ]}
    />
  )
}
