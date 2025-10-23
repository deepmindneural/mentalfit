import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sesiones Próximas | MentalFit',
  description: 'Calendario inmediato'
}

export default function PaginaSesionesPróximas() {
  return (
    <EnConstruccion
      titulo="Sesiones Próximas"
      descripcion="Calendario inmediato"
      funcionalidadesEsperadas={[
        'Sesiones de hoy',
        'Sesiones de la semana',
        'Preparación pre-sesión',
        'Unirse a videollamada',
        'Reprogramar',
        'Cancelar sesión'
      ]}
    />
  )
}
