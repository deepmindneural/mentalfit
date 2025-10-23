import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ejercicios | MentalFit',
  description: 'Actividades prácticas'
}

export default function PaginaEjercicios() {
  return (
    <EnConstruccion
      titulo="Ejercicios"
      descripcion="Actividades prácticas"
      funcionalidadesEsperadas={[
        'Lista de ejercicios',
        'Categorías (respiración, mindfulness, etc.)',
        'Buscar ejercicios',
        'Ejercicios guiados',
        'Guardar favoritos',
        'Seguimiento de práctica'
      ]}
    />
  )
}
