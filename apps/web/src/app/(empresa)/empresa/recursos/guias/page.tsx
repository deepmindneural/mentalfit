import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guías | MentalFit',
  description: 'Documentación para empresa'
}

export default function PaginaGuías() {
  return (
    <EnConstruccion
      titulo="Guías"
      descripcion="Documentación para empresa"
      funcionalidadesEsperadas={[
        'Guía de onboarding',
        'Guía para RRHH',
        'Guía de comunicación interna',
        'Guía de adopción',
        'Guía de métricas',
        'Descargar todas'
      ]}
    />
  )
}
