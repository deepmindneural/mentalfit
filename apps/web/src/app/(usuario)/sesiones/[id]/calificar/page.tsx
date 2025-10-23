import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calificar Sesión | MentalFit',
  description: 'Valorar experiencia'
}

export default function PaginaCalificarSesion() {
  return (
    <EnConstruccion
      titulo="Calificar Sesión"
      descripcion="Valorar experiencia"
      funcionalidadesEsperadas={[
        'Calificación de estrellas',
        'Comentarios opcionales',
        'Aspectos destacados',
        'Áreas de mejora',
        'Recomendar terapeuta',
        'Enviar calificación'
      ]}
    />
  )
}
