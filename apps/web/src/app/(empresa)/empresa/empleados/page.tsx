import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Empleados | MentalFit',
  description: 'Administrar usuarios corporativos'
}

export default function PaginaGestióndeEmpleados() {
  return (
    <EnConstruccion
      titulo="Gestión de Empleados"
      descripcion="Administrar usuarios corporativos"
      funcionalidadesEsperadas={[
        'Lista de empleados activos',
        'Búsqueda y filtros',
        'Uso individual',
        'Invitaciones pendientes',
        'Alta y baja masiva',
        'Exportar datos'
      ]}
    />
  )
}
