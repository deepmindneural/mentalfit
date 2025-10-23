import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Empleado | MentalFit',
  description: 'Modificar datos de usuario'
}

export default function PaginaEditarEmpleado() {
  return (
    <EnConstruccion
      titulo="Editar Empleado"
      descripcion="Modificar datos de usuario"
      funcionalidadesEsperadas={[
        'Actualizar información',
        'Cambiar departamento',
        'Ajustar límites individuales',
        'Reset de contraseña',
        'Suspender acceso',
        'Historial de cambios'
      ]}
    />
  )
}
