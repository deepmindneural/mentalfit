import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Empleados | MentalFit',
  description: 'Gestión de usuarios corporativos'
}

export default function PaginaEmpleadosEmpresa() {
  return (
    <EnConstruccion
      titulo="Empleados"
      descripcion="Gestión de usuarios corporativos"
      funcionalidadesEsperadas={[
        'Lista de empleados',
        'Alta y baja de usuarios',
        'Uso individual',
        'Departamentos',
        'Importación masiva',
        'Exportar datos'
      ]}
    />
  )
}
