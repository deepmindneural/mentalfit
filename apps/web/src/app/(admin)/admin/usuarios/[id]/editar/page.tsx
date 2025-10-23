import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Usuario | MentalFit',
  description: 'Modificar datos de usuario'
}

export default function PaginaEditarUsuario() {
  return (
    <EnConstruccion
      titulo="Editar Usuario"
      descripcion="Modificar datos de usuario"
      funcionalidadesEsperadas={[
        'Actualizar información',
        'Cambiar plan',
        'Ajustar límites',
        'Reset de contraseña',
        'Modificar permisos',
        'Historial de cambios'
      ]}
    />
  )
}
