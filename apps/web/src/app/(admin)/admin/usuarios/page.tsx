import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Usuarios | MentalFit',
  description: 'Administrar usuarios finales'
}

export default function PaginaGestióndeUsuarios() {
  return (
    <EnConstruccion
      titulo="Gestión de Usuarios"
      descripcion="Administrar usuarios finales"
      funcionalidadesEsperadas={[
        'Lista de usuarios',
        'Búsqueda y filtros',
        'Usuarios activos vs inactivos',
        'Segmentos de usuarios',
        'Acciones masivas',
        'Exportar datos'
      ]}
    />
  )
}
