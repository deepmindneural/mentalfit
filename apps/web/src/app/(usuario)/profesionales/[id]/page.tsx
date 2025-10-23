import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perfil de Profesional | MentalFit',
  description: 'Detalles del terapeuta'
}

export default function PaginaPerfilProfesional() {
  return (
    <EnConstruccion
      titulo="Perfil de Profesional"
      descripcion="Detalles del terapeuta"
      funcionalidadesEsperadas={[
        'Información profesional',
        'Especialidades y enfoque',
        'Experiencia y formación',
        'Calificaciones y reseñas',
        'Disponibilidad',
        'Reservar sesión'
      ]}
    />
  )
}
