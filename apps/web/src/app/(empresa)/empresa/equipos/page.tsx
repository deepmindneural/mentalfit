import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipos | MentalFit',
  description: 'Gestión de equipos de trabajo'
}

export default function PaginaEquipos() {
  return (
    <EnConstruccion
      titulo="Equipos"
      descripcion="Gestión de equipos de trabajo"
      funcionalidadesEsperadas={[
        'Lista de equipos',
        'Crear equipo',
        'Asignar miembros',
        'Métricas por equipo',
        'Reorganizar',
        'Eliminar equipo'
      ]}
    />
  )
}
