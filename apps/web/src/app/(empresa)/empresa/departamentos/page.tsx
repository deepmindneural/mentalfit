import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Departamentos | MentalFit',
  description: 'Gestión de áreas organizacionales'
}

export default function PaginaDepartamentos() {
  return (
    <EnConstruccion
      titulo="Departamentos"
      descripcion="Gestión de áreas organizacionales"
      funcionalidadesEsperadas={[
        'Lista de departamentos',
        'Crear departamento',
        'Empleados por área',
        'Métricas por departamento',
        'Reorganizar',
        'Eliminar departamento'
      ]}
    />
  )
}
