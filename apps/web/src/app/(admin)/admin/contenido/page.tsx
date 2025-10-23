import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Contenido | MentalFit',
  description: 'Administrar contenido'
}

export default function PaginaGestióndeContenido() {
  return (
    <EnConstruccion
      titulo="Gestión de Contenido"
      descripcion="Administrar contenido"
      funcionalidadesEsperadas={[
        'Artículos publicados',
        'Recursos disponibles',
        'Evaluaciones activas',
        'Templates',
        'Crear nuevo contenido',
        'Estadísticas de uso'
      ]}
    />
  )
}
