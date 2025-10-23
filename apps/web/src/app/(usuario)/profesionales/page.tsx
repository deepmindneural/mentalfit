import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Profesionales | MentalFit',
  description: 'Encuentra tu terapeuta ideal'
}

export default function PaginaBuscarProfesionales() {
  return (
    <EnConstruccion
      titulo="Buscar Profesionales"
      descripcion="Encuentra tu terapeuta ideal"
      funcionalidadesEsperadas={[
        'Búsqueda avanzada',
        'Filtros por especialidad',
        'Filtros por idioma',
        'Filtros por disponibilidad',
        'Ordenar por calificación',
        'Ver perfiles detallados'
      ]}
    />
  )
}
