import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profesionales Favoritos | MentalFit',
  description: 'Tus terapeutas guardados'
}

export default function PaginaProfesionalesFavoritos() {
  return (
    <EnConstruccion
      titulo="Profesionales Favoritos"
      descripcion="Tus terapeutas guardados"
      funcionalidadesEsperadas={[
        'Lista de favoritos',
        'Acceso rápido',
        'Reservar con favoritos',
        'Eliminar de favoritos',
        'Compartir perfil',
        'Notificaciones de disponibilidad'
      ]}
    />
  )
}
