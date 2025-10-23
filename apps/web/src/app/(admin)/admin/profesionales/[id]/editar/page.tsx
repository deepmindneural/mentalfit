import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Profesional | MentalFit',
  description: 'Modificar datos de terapeuta'
}

export default function PaginaEditarProfesional() {
  return (
    <EnConstruccion
      titulo="Editar Profesional"
      descripcion="Modificar datos de terapeuta"
      funcionalidadesEsperadas={[
        'Actualizar información',
        'Modificar especialidades',
        'Ajustar tarifas',
        'Cambiar disponibilidad',
        'Actualizar certificaciones',
        'Historial de cambios'
      ]}
    />
  )
}
