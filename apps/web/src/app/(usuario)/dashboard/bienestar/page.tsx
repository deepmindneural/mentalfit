import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Bienestar | MentalFit',
  description: 'Dashboard de salud mental personal'
}

export default function PaginaMiBienestar() {
  return (
    <EnConstruccion
      titulo="Mi Bienestar"
      descripcion="Dashboard de salud mental personal"
      funcionalidadesEsperadas={[
        'Indicadores de bienestar actuales',
        'Tendencias y evolución',
        'Recomendaciones personalizadas',
        'Recursos sugeridos',
        'Próximas sesiones',
        'Objetivos de bienestar'
      ]}
    />
  )
}
