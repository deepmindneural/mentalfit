import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roles y Permisos | MentalFit',
  description: 'Gestión de accesos'
}

export default function PaginaRolesyPermisos() {
  return (
    <EnConstruccion
      titulo="Roles y Permisos"
      descripcion="Gestión de accesos"
      funcionalidadesEsperadas={[
        'Lista de roles',
        'Crear/editar rol',
        'Matriz de permisos',
        'Asignación de usuarios',
        'Auditoría de accesos',
        'Roles predefinidos'
      ]}
    />
  )
}
