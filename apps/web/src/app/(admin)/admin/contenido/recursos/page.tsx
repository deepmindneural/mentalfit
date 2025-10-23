import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recursos | MentalFit',
  description: 'Gestión de recursos educativos'
}

export default function PaginaRecursos() {
  return (
    <EnConstruccion
      titulo="Recursos"
      descripcion="Gestión de recursos educativos"
      funcionalidadesEsperadas={[
        'Lista de recursos',
        'Subir nuevo recurso',
        'Categorización',
        'Control de acceso',
        'Estadísticas de descarga',
        'Destacados'
      ]}
    />
  )
}
