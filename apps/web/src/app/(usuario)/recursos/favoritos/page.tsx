import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recursos Favoritos | MentalFit',
  description: 'Contenido guardado'
}

export default function PaginaRecursosFavoritos() {
  return (
    <EnConstruccion
      titulo="Recursos Favoritos"
      descripcion="Contenido guardado"
      funcionalidadesEsperadas={[
        'Todos los favoritos',
        'Filtrar por tipo',
        'Acceso rápido',
        'Eliminar favoritos',
        'Compartir colección',
        'Exportar lista'
      ]}
    />
  )
}
