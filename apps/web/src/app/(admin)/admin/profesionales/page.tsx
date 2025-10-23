import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Profesionales | MentalFit',
  description: 'Administrar terapeutas'
}

export default function PaginaGestióndeProfesionales() {
  return (
    <EnConstruccion
      titulo="Gestión de Profesionales"
      descripcion="Administrar terapeutas"
      funcionalidadesEsperadas={[
        'Lista de profesionales activos',
        'Búsqueda y filtros',
        'Estado de verificación',
        'Calificaciones y reseñas',
        'Acciones masivas',
        'Exportar datos'
      ]}
    />
  )
}
