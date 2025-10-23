import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cómo Funciona | MentalFit',
  description: 'Descubre cómo funciona nuestra plataforma de salud mental'
}

export default function PaginaComoFunciona() {
  return (
    <EnConstruccion
      titulo="Cómo Funciona"
      descripcion="Descubre el proceso paso a paso de MentalFit"
      funcionalidadesEsperadas={[
        'Proceso de registro y onboarding',
        'Búsqueda y selección de profesionales',
        'Sistema de reservas y videoconsultas',
        'Seguimiento y evaluaciones de progreso',
        'Recursos y herramientas disponibles',
        'Garantías y políticas de calidad'
      ]}
    />
  )
}
